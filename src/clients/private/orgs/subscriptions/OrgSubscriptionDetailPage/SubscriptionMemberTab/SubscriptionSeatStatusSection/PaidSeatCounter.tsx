import {SubscriptionDto} from '^models/Subscription/types';
import {useSeatCounter} from '^models/SubscriptionSeat/hook/useSeatCounter';
import {UserPlus} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {useCurrentSubscription} from '../../atom';
import {StatusCard} from '../../SubscriptionInfoTab/StatusCard';

export const usePaidSeatCounter = (subscription: SubscriptionDto | null) => {
    return useSeatCounter(subscription, {
        where: {isPaid: true},
    });
};

export const PaidSeatCounter = memo(() => {
    const {t} = useTranslation('subscription');
    const {currentSubscription} = useCurrentSubscription();
    const {count} = usePaidSeatCounter(currentSubscription);

    return (
        <StatusCard
            label={t('detail.seatStatus.purchased')}
            value={count.toLocaleString()}
            icon={<UserPlus className="size-6 text-white" />}
            iconColor="bg-orange-400"
        />
    );
});
