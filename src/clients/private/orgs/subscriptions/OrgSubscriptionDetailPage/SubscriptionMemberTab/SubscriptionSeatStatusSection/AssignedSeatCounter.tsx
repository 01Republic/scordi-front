import {SubscriptionDto} from '^models/Subscription/types';
import {useSeatCounter} from '^models/SubscriptionSeat/hook/useSeatCounter';
import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type';
import {User} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {StatusCard} from '../../SubscriptionInfoTab/StatusCard';
import {useCurrentSubscription} from '../../atom';

export const useAssignedSeatCounter = (subscription: SubscriptionDto | null) => {
    return useSeatCounter(subscription, {
        where: {teamMemberId: {op: 'not', val: 'NULL'}, status: {op: 'not', val: SubscriptionSeatStatus.QUIT}},
    });
};

export const AssignedSeatCounter = memo(() => {
    const {t} = useTranslation('subscription');
    const {currentSubscription} = useCurrentSubscription();
    const {count} = useAssignedSeatCounter(currentSubscription);

    return (
        <StatusCard
            label={t('detail.seatStatus.assigned')}
            value={count.toLocaleString()}
            icon={<User className="size-6 text-white" />}
            iconColor={'bg-purple-400'}
        />
    );
});
