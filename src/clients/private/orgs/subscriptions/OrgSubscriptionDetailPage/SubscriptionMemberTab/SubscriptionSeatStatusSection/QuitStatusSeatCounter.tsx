import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type';
import {useSeatCounter} from '^models/SubscriptionSeat/hook/useSeatCounter';
import {useCurrentSubscription} from '../../atom';
import {StatusCard} from '../../SubscriptionInfoTab/StatusCard';
import {UserX} from 'lucide-react';

export const useQuitStatusSeatCounter = (subscription: SubscriptionDto | null) => {
    return useSeatCounter(subscription, {
        where: {status: SubscriptionSeatStatus.QUIT},
    });
};

export const QuitStatusSeatCounter = memo(() => {
    const {currentSubscription} = useCurrentSubscription();
    const {count} = useQuitStatusSeatCounter(currentSubscription);

    return (
        <StatusCard
            title="해지 완료된 계정"
            titleValue={count.toLocaleString()}
            icon={<UserX className="size-6 text-white" />}
            iconColor="bg-blue-400"
        />
    );
});
