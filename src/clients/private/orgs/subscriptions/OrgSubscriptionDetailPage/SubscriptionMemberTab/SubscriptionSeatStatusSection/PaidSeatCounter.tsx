import React, {memo} from 'react';
import {StatusCard} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/StatusCard';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {SubscriptionDto} from '^models/Subscription/types';
import {useSeatCounter} from '^models/SubscriptionSeat/hook/useSeatCounter';
import {User, UserPlus} from 'lucide-react';

export const usePaidSeatCounter = (subscription: SubscriptionDto | null) => {
    return useSeatCounter(subscription, {
        where: {isPaid: true},
    });
};

export const PaidSeatCounter = memo(() => {
    const {currentSubscription} = useCurrentSubscription();
    const {count} = usePaidSeatCounter(currentSubscription);

    return (
        <StatusCard
            title="구매한 계정"
            titleValue={count.toLocaleString()}
            icon={<UserPlus size={20} className="h-full w-full p-[6px] text-white" />}
            iconColor="bg-orange-400"
        />
    );
});
