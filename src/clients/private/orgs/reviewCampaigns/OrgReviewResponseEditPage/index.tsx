import {getToken} from '^api/api';
import {
    orgIdParamState,
    reviewCampaignIdParamState,
    reviewResponseIdParamState,
    useRouterIdParamState,
} from '^atoms/common';
import {reviewResponseApi} from '^models/ReviewResponse/api';
import {useReviewRequest} from '^models/ReviewResponse/hook';
import {ReviewResponseDto} from '^models/ReviewResponse/type/ReviewResponse.dto';
import {useCurrentUser} from '^models/User/hook';
import {OrgReviewResponseCompletePageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/reviewResponses/[reviewResponseId]/edit/complete';
import {Button} from '^public/components/ui/button';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {useRecoilValue} from 'recoil';
import {ExpiredResponseView} from './ExpiredResponseView';
import {ReviewCampaignHeader} from './ReviewCampaignHeader';
import {ReviewInquiryForm} from './ReviewInquiryForm';
import {ReviewRespondentForm} from './ReviewRespondentForm';
import {ReviewSubscriptionList} from './ReviewSubscriptionList';
import {SubmittedResponseView} from './SubmittedResponseView';

export type FormInputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const getInitialFormData = (orgId: number, reviewCampaignId: number): ReviewResponseDto => ({
    id: 0,
    organizationId: orgId,
    campaignId: reviewCampaignId,
    teamMemberId: null,
    respondentName: '',
    respondentEmail: '',
    respondentTeamId: null,
    lastSentAt: null,
    submittedAt: null,
    otherSubscriptionComment: '',
    inquiry: '',
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const OrgReviewResponseEditPage = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentUser} = useCurrentUser();
    const {responseData} = useReviewRequest();
    const router = useRouter();
    const reviewCampaignId = useRouterIdParamState('reviewCampaignId', reviewCampaignIdParamState);
    const reviewResponseId = useRouterIdParamState('reviewResponseId', reviewResponseIdParamState);
    const token = getToken();

    const [formData, setFormData] = useState<ReviewResponseDto>(
        getInitialFormData(Number(orgId), Number(reviewCampaignId)),
    );

    useEffect(() => {
        if (currentUser) {
            const currentMembership = currentUser.findMembershipByOrgId(Number(orgId));
            const currentTeam = currentMembership?.teamMember?.teams?.[0];
            setFormData((prev) => ({
                ...prev,
                respondentName: currentUser.name || '',
                respondentEmail: currentUser.email || '',
                respondentTeamId: currentTeam?.id || null,
            }));
        }
    }, [currentUser, orgId]);

    const handleSubmit = () => {
        reviewResponseApi
            .submit(Number(orgId), Number(reviewCampaignId), Number(reviewResponseId), token || '')
            .then(() => {
                router.push(
                    OrgReviewResponseCompletePageRoute.path(
                        Number(orgId),
                        Number(reviewCampaignId),
                        Number(reviewResponseId),
                    ),
                );
            })
            .catch((error) => {
                toast.error('응답 제출 중 오류가 발생했습니다.');
                console.error(error);
            });
    };

    const handleInputChange = (e: FormInputChangeEvent) => {
        const {id, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleTeamSelect = (selectedTeam: any) => {
        setFormData((prev) => ({...prev, team: selectedTeam}));
    };

    if (!responseData) return null;

    if (responseData.campaign?.finishAt && responseData.campaign.finishAt < new Date()) {
        return <ExpiredResponseView />;
    }

    if (responseData.submittedAt) {
        return <SubmittedResponseView />;
    }

    return (
        <div className="bg-[#EFEFFD]">
            <div className="space-y-5 min-h-lvh max-w-screen-sm mx-auto py-20">
                <ReviewCampaignHeader
                    title={responseData?.campaign?.title}
                    description={responseData?.campaign?.description}
                />

                {!currentUser && (
                    <ReviewRespondentForm onInputChange={handleInputChange} onTeamSelect={handleTeamSelect} />
                )}

                <ReviewSubscriptionList subscriptions={responseData?.campaign?.subscriptions || []} />

                <ReviewInquiryForm onInputChange={handleInputChange} />

                <div className="grid w-full items-center">
                    <Button size="xl" variant="scordi" onClick={handleSubmit}>
                        작성 완료
                    </Button>
                    <div className="text-gray-400 text-center py-3 text-12">powered by scordi</div>
                </div>
            </div>
        </div>
    );
};
