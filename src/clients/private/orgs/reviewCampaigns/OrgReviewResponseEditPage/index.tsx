import {getToken} from '^api/api';
import {orgIdParamState, useIdParam} from '^atoms/common';
import {reviewResponseApi} from '^models/ReviewResponse/api';
import {useReviewRequest} from '^models/ReviewResponse/hook';
import {UpdateReviewResponseRequestDto} from '^models/ReviewResponse/type';
import {useCurrentUser} from '^models/User/hook';
import {OrgReviewResponseCompletePageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/reviewResponses/[reviewResponseId]/edit/complete';
import {Button} from '^public/components/ui/button';
import {LoaderCircle} from 'lucide-react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {useRecoilValue} from 'recoil';
import {ExpiredResponseView} from './ExpiredResponseView';
import {ReviewCampaignHeader} from './ReviewCampaignHeader';
import {ReviewInquiryForm} from './ReviewInquiryForm';
import {ReviewRespondentForm} from './ReviewRespondentForm';
import {ReviewSubscriptionList} from './ReviewSubscriptionList';
import {SubmittedResponseView} from './SubmittedResponseView';

export const OrgReviewResponseEditPage = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const campaignId = useIdParam('reviewCampaignId');
    const id = useIdParam('reviewResponseId');
    const {currentUser} = useCurrentUser();
    const token = getToken();
    const {data: response, isError} = useReviewRequest(orgId, campaignId, id, token || '');
    const router = useRouter();
    const form = useForm<UpdateReviewResponseRequestDto>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isError && !response) router.replace('/404');
    }, [isError, response]);

    useEffect(() => {
        if (!response) return;

        form.setValue('respondentName', response.respondentName);
        form.setValue('respondentEmail', response.respondentEmail);
        form.setValue('respondentTeamId', response.respondentTeamId);
        form.setValue('inquiry', response.inquiry || undefined);
        const subscriptions = (response.subscriptions || []).map((sub) => ({
            id: sub.id,
            subscriptionId: sub.subscriptionId,
            usingStatus: sub.usingStatus,
        }));
        form.setValue('subscriptions', subscriptions);
    }, [response]);

    const onSubmit = (data: UpdateReviewResponseRequestDto) => {
        setIsLoading(true);
        reviewResponseApi
            .submit(orgId, campaignId, id, token || '', data)
            .then(() => {
                return router.push(OrgReviewResponseCompletePageRoute.path(orgId, campaignId, id));
            })
            .catch((error) => {
                toast.error('응답 제출 중 오류가 발생했습니다.');
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    if (!response) return <></>;

    // 제출 완료
    if (response.submittedAt) return <SubmittedResponseView />;

    // 응답 마감시간 초과
    if (response.campaign?.isOverdue()) return <ExpiredResponseView />;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-[#EFEFFD]">
                <div className="space-y-5 min-h-lvh max-w-screen-sm mx-auto px-4 py-8 sm:py-20">
                    <ReviewCampaignHeader
                        title={response?.campaign?.title}
                        description={response?.campaign?.description}
                    />

                    {!currentUser && <ReviewRespondentForm form={form} />}

                    <ReviewSubscriptionList
                        form={form}
                        campaignSubscriptions={response.campaign?.subscriptions || []}
                    />

                    <ReviewInquiryForm form={form} />

                    <div className="grid w-full items-center">
                        <Button size="xl" variant="scordi" type="submit" disabled={isLoading}>
                            {isLoading ? <LoaderCircle className="animate-spin" strokeWidth="4px" /> : '작성 완료'}
                        </Button>
                        <div className="text-gray-400 text-center py-3 text-12">powered by scordi</div>
                    </div>
                </div>
            </div>
        </form>
    );
};
