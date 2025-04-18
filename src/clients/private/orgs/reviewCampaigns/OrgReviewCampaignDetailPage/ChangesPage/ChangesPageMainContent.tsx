import {memo, useState} from 'react';
import {useIdParam} from '^atoms/common';
import {useListControl} from '^hooks/useResource';
import {Progress} from '^public/components/ui/progress';
import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type';
import {useReviewCampaignSubscriptions, useReviewResponseSubscriptions} from '^models/ReviewCampaign/hook';
import {CampaignSubBoard} from './CampaignSubBoard';
import {CheckBoxButton} from './CheckBoxButton';
import {ChangesPageContentTitle} from './ChangesPageContentTitle';

interface ChangesPageMainContentProps {
    selectedCampaignSub?: ReviewCampaignSubscriptionDto;
}

export const ChangesPageMainContent = memo((props: ChangesPageMainContentProps) => {
    const {selectedCampaignSub} = props;
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');
    const {
        data: {items: campaignSubs, pagination},
        refetch: refetchReviewCampaignSubscriptions,
    } = useReviewCampaignSubscriptions(orgId, id, {
        order: {subscriptionId: 'DESC'},
        itemsPerPage: 0,
    });
    const {
        data: {items: responseSubs},
        refetch: refetchReviewResponseSubscriptions,
    } = useReviewResponseSubscriptions(orgId, id, {
        relations: ['response', 'teamMember'],
        itemsPerPage: 0,
    });
    const [confirmedSubs, setConfirmedSubs] = useState<ReviewCampaignSubscriptionDto[]>([]);
    const {add: addConfirmedSubs, remove: removeConfirmedSubs} = useListControl(setConfirmedSubs, (item) => item.id);

    const totalCount = pagination.totalItemCount;
    const confirmedCount = confirmedSubs.length;
    const leftCount = totalCount - confirmedCount;
    const progress = totalCount > 0 ? Math.round((confirmedCount / totalCount) * 100) : 0;

    const reload = () => {
        return Promise.all([refetchReviewCampaignSubscriptions(), refetchReviewResponseSubscriptions()]);
    };

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-base">
                    <ChangesPageContentTitle totalCount={totalCount} leftCount={leftCount} />
                </h3>
                <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-700">
                            {confirmedCount} / {totalCount} 확인 완료
                        </span>
                        <Progress
                            value={progress}
                            className="w-32 h-2 mt-1.5 bg-neutral-100"
                            indicatorClassName="bg-primaryColor-900"
                        />
                    </div>
                    <CheckBoxButton
                        checked={totalCount > 0 && confirmedCount === totalCount}
                        onChange={(checked) => setConfirmedSubs(checked ? campaignSubs : [])}
                    >
                        <span className="font-medium">전체 확인 완료</span>
                    </CheckBoxButton>
                </div>
            </div>

            <div className="space-y-2">
                {campaignSubs.map((campaignSub) => {
                    const subId = campaignSub.subscriptionId;
                    const entries = responseSubs.filter((sub) => {
                        // return sub.subscriptionId === subId && sub.submittedAt; // 미제출을 숨기려면 이걸 쓴다.
                        return sub.subscriptionId === subId;
                    });
                    return (
                        <CampaignSubBoard
                            key={campaignSub.id}
                            campaignSubscription={campaignSub}
                            responseSubscriptions={entries}
                            isFocused={!!selectedCampaignSub && selectedCampaignSub.id === campaignSub.id}
                            isConfirmed={confirmedSubs.some((sub) => sub.id === campaignSub.id)}
                            toggleConfirm={(checked) => {
                                checked ? addConfirmedSubs(campaignSub) : removeConfirmedSubs(campaignSub);
                            }}
                            reload={reload}
                        />
                    );
                })}
            </div>
        </div>
    );
});
ChangesPageMainContent.displayName = 'ChangesPageMainContent';
