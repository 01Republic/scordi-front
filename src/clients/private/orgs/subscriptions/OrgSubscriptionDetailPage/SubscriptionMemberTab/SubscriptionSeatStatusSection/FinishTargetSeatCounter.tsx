import React, {memo} from 'react';
import {UserMinus} from 'lucide-react';
import {SubscriptionDto} from '^models/Subscription/types';
import {useSeatCounter} from '^models/SubscriptionSeat/hook/useSeatCounter';
import {useCurrentSubscription} from '../../atom';
import {StatusCard} from '../../SubscriptionInfoTab/StatusCard';

export const useFinishTargetSeatCounter = (subscription: SubscriptionDto | null) => {
    return useSeatCounter(subscription, {isFinishTargetOnly: true});
};

export const FinishTargetSeatCounter = memo(() => {
    const {currentSubscription} = useCurrentSubscription();
    const {count} = useFinishTargetSeatCounter(currentSubscription);

    return (
        <StatusCard
            label="이번달 회수(예정) 계정"
            value={count.toLocaleString()}
            icon={<UserMinus className="size-6 text-white" />}
            iconColor="bg-pink-400"
        />
    );
});
