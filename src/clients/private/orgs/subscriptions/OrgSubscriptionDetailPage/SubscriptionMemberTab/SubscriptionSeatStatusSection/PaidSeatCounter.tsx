import React, {memo} from 'react';
import {UserPlus} from 'lucide-react';
import {SubscriptionDto} from '^models/Subscription/types';
import {useSeatCounter} from '^models/SubscriptionSeat/hook/useSeatCounter';
import {useCurrentSubscription} from '../../atom';
import {StatusCard} from '../../SubscriptionInfoTab/StatusCard';

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
            label="구매된 시트"
            value={count.toLocaleString()}
            icon={<UserPlus className="size-6 text-white" />}
            iconColor="bg-orange-400"
        />
    );
});
