import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {useSeatCounter} from '^models/SubscriptionSeat/hook/useSeatCounter';
import {useCurrentSubscription} from '../../atom';
import {StatusCard} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/StatusCard';
import {UserMinus} from 'lucide-react';

export const useFinishTargetSeatCounter = (subscription: SubscriptionDto | null) => {
    return useSeatCounter(subscription, {isFinishTargetOnly: true});
};

export const FinishTargetSeatCounter = memo(() => {
    const {currentSubscription} = useCurrentSubscription();
    const {count} = useFinishTargetSeatCounter(currentSubscription);

    return (
        <StatusCard
            title="이번달 회수(예정) 계정"
            titleValue={count.toLocaleString()}
            icon={<UserMinus className="size-6 text-white" />}
            iconColor="bg-pink-400"
        />
    );
});
