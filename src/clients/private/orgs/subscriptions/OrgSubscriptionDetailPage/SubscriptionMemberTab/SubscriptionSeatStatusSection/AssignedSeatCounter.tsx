import React, {memo} from 'react';
import {RiUser3Fill} from 'react-icons/ri';
import {StatusCard} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/StatusCard';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {SubscriptionDto} from '^models/Subscription/types';
import {useSeatCounter} from '^models/SubscriptionSeat/hook/useSeatCounter';
import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type';

export const useAssignedSeatCounter = (subscription: SubscriptionDto | null) => {
    return useSeatCounter(subscription, {
        where: {teamMemberId: {op: 'not', val: 'NULL'}},
    });
};

export const useQuitStatusSeatCounter = (subscription: SubscriptionDto | null) => {
    return useSeatCounter(subscription, {
        where: {status: SubscriptionSeatStatus.QUIT},
    });
};

export const AssignedSeatCounter = memo(() => {
    const {currentSubscription} = useCurrentSubscription();
    const {count} = useAssignedSeatCounter(currentSubscription);

    return (
        <StatusCard
            title={'현재 할당된 계정'}
            titleValue={count.toLocaleString()}
            icon={<RiUser3Fill size={20} className="h-full w-full p-[6px] text-white" />}
            iconColor={'bg-purple-400'}
        />
    );
});
