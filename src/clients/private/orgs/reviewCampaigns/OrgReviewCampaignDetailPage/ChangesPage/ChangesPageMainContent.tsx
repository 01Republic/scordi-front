import {memo, useState} from 'react';
import {useIdParam} from '^atoms/common';
import {Progress} from '^public/components/ui/progress';
import {Checkbox} from '^public/components/ui/checkbox';
import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type';
import {useReviewCampaignSubscriptions, useReviewResponseSubscriptions} from '^models/ReviewCampaign/hook';
import {ChangesItem} from './ChangesItem';
import {CheckBoxButton} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignDetailPage/ChangesPage/CheckBoxButton';

interface ChangesPageMainContentProps {
    //
}

function useListControl<T>(setState: React.Dispatch<React.SetStateAction<T[]>>, getKey: (item: T) => any) {
    const add = (item: T) => {
        setState((prev) => {
            const existAlready = prev.find((it) => getKey(it) === getKey(item));
            return existAlready ? prev : [...prev, item];
        });
    };

    const remove = (item: T) => {
        setState((prev) => {
            return prev.filter((it) => getKey(it) !== getKey(item));
        });
    };

    return {add, remove};
}

export const ChangesPageMainContent = memo((props: ChangesPageMainContentProps) => {
    const {} = props;
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');
    const {
        data: {items: campaignSubscriptions, pagination},
    } = useReviewCampaignSubscriptions(orgId, id, {
        order: {subscriptionId: 'DESC'},
        itemsPerPage: 0,
    });
    const {
        data: {items: responseSubscriptions},
    } = useReviewResponseSubscriptions(orgId, id, {
        relations: ['response', 'teamMember'],
        itemsPerPage: 0,
    });
    const [confirmedSubs, setConfirmedSubs] = useState<ReviewCampaignSubscriptionDto[]>([]);
    const {add: addConfirmedSubs, remove: removeConfirmedSubs} = useListControl(setConfirmedSubs, (item) => item.id);

    const totalCount = pagination.totalItemCount;
    const confirmedCount = confirmedSubs.length;
    const progress = totalCount > 0 ? Math.round((confirmedCount / totalCount) * 100) : 0;

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-base">승인 대기중 ({totalCount - confirmedCount})</h3>
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
                        onChange={(checked) => setConfirmedSubs(checked ? campaignSubscriptions : [])}
                    >
                        <span className="font-medium">전체 확인 완료</span>
                    </CheckBoxButton>
                </div>
            </div>

            <div className="space-y-2">
                {campaignSubscriptions.map((campaignSub) => (
                    <div key={campaignSub.id} id={campaignSub.domId}>
                        <ChangesItem
                            campaignSubscription={campaignSub}
                            responseSubscriptions={responseSubscriptions.filter(
                                (responseSub) => responseSub.subscriptionId === campaignSub.subscriptionId,
                            )}
                            isConfirmed={confirmedSubs.some((sub) => sub.id === campaignSub.id)}
                            toggleConfirm={(campaignSubscription, value) => {
                                value
                                    ? addConfirmedSubs(campaignSubscription)
                                    : removeConfirmedSubs(campaignSubscription);
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});
ChangesPageMainContent.displayName = 'ChangesPageMainContent';
