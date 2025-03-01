import React, {memo} from 'react';
import {RiUserUnfollowFill} from 'react-icons/ri';
import {SubscriptionDto} from '^models/Subscription/types';
import {useSeatCounter} from '^models/SubscriptionSeat/hook/useSeatCounter';
import {useCurrentSubscription} from '../../atom';
import {StatusCard} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/StatusCard';

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
            icon={<RiUserUnfollowFill size={20} className="h-full w-full p-[6px] text-white" />}
            iconColor="bg-pink-400"
        />
    );
});
