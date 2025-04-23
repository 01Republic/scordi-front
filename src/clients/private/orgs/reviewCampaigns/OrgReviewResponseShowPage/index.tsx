import {memo, useEffect} from 'react';
import {useIdParam} from '^atoms/common';
import {useCurrentUser} from '^models/User/hook';
import {getToken} from '^api/api';
import {useReviewRequest} from '^models/ReviewResponse/hook';
import {useRouter} from 'next/router';
import {ReviewCampaignHeader} from '^clients/private/orgs/reviewCampaigns/OrgReviewResponseEditPage/ReviewCampaignHeader';
import {ReviewRespondentForm} from '^clients/private/orgs/reviewCampaigns/OrgReviewResponseEditPage/ReviewRespondentForm';
import {ReviewSubscriptionList} from '^clients/private/orgs/reviewCampaigns/OrgReviewResponseEditPage/ReviewSubscriptionList';
import {ReviewInquiryForm} from '^clients/private/orgs/reviewCampaigns/OrgReviewResponseEditPage/ReviewInquiryForm';
import {Button, ButtonLink} from '^public/components/ui/button';
import {useForm} from 'react-hook-form';
import {UpdateReviewResponseRequestDto} from '^models/ReviewResponse/type';

export const OrgReviewResponseShowPage = memo(function OrgReviewResponseShowPage() {
    const orgId = useIdParam('id');
    const campaignId = useIdParam('reviewCampaignId');
    const id = useIdParam('reviewResponseId');
    const token = getToken();
    const {data: response, isError} = useReviewRequest(orgId, campaignId, id, token || '');
    const router = useRouter();
    const form = useForm<UpdateReviewResponseRequestDto>();

    useEffect(() => {
        if (isError && !response) router.replace('/404');
    }, [isError, response]);

    useEffect(() => {
        if (!response) return;

        form.setValue('respondentName', response.respondentName || response.teamMember?.name);
        form.setValue('respondentEmail', response.respondentEmail || response.teamMember?.email);
        form.setValue('respondentTeamId', response.respondentTeamId || response.teamMember?.team?.id);
        form.setValue('inquiry', response.inquiry || undefined);
        const subscriptions = (response.subscriptions || []).map((sub) => ({
            id: sub.id,
            subscriptionId: sub.subscriptionId,
            usingStatus: sub.usingStatus,
        }));
        form.setValue('subscriptions', subscriptions);
    }, [response]);

    if (!response) return <></>;

    return (
        <div className="bg-[#EFEFFD]">
            <div className="space-y-5 min-h-lvh max-w-screen-sm mx-auto px-4 py-8 sm:py-20">
                <ReviewCampaignHeader title={response?.campaign?.title} description={response?.campaign?.description} />

                <ReviewRespondentForm form={form} readonly />

                <ReviewSubscriptionList
                    form={form}
                    campaignSubscriptions={response.campaign?.subscriptions || []}
                    readonly
                />

                <ReviewInquiryForm form={form} readonly />

                <div className="grid w-full items-center">
                    <Button size="xl" variant="scordi" type="button" onClick={() => router.back()}>
                        닫기
                    </Button>
                    <div className="text-gray-400 text-center py-3 text-12">powered by scordi</div>
                </div>
            </div>
        </div>
    );
});
