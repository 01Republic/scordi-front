import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {useSeatCounter} from '^models/SubscriptionSeat/hook/useSeatCounter';
import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type';
import {StatusCard} from '../../SubscriptionInfoTab/StatusCard';
import {useCurrentSubscription} from '../../atom';
import {User} from 'lucide-react';

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
            title={'현재 할당된 계정'}
            titleValue={count.toLocaleString()}
            icon={<User size={20} className="h-full w-full p-[6px] text-white" />}
            iconColor={'bg-purple-400'}
        />
    );
});
