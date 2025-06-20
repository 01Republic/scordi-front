import React, {memo} from 'react';
import {User} from 'lucide-react';
import {SubscriptionDto} from '^models/Subscription/types';
import {useSeatCounter} from '^models/SubscriptionSeat/hook/useSeatCounter';
import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type';
import {StatusCard} from '../../SubscriptionInfoTab/StatusCard';
import {useCurrentSubscription} from '../../atom';

export const useAssignedSeatCounter = (subscription: SubscriptionDto | null) => {
    return useSeatCounter(subscription, {
        where: {teamMemberId: {op: 'not', val: 'NULL'}, status: {op: 'not', val: SubscriptionSeatStatus.QUIT}},
    });
};

export const AssignedSeatCounter = memo(() => {
    const {currentSubscription} = useCurrentSubscription();
    const {count} = useAssignedSeatCounter(currentSubscription);

    return (
        <StatusCard
            label="이용중인 시트"
            value={count.toLocaleString()}
            icon={<User className="size-6 text-white" />}
            iconColor={'bg-purple-400'}
        />
    );
});
