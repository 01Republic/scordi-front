import {SubscriptionDto} from '^models/Subscription/types';
import {useSeatCounter} from '^models/SubscriptionSeat/hook/useSeatCounter';
import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type';
import {UserX} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {useCurrentSubscription} from '../../atom';
import {StatusCard} from '../../SubscriptionInfoTab/StatusCard';

export const useQuitStatusSeatCounter = (subscription: SubscriptionDto | null) => {
    return useSeatCounter(subscription, {
        where: {status: SubscriptionSeatStatus.QUIT},
    });
};

export const QuitStatusSeatCounter = memo(() => {
    const {t} = useTranslation('subscription');
    const {currentSubscription} = useCurrentSubscription();
    const {count} = useQuitStatusSeatCounter(currentSubscription);

    return (
        <StatusCard
            label={t('detail.seatStatus.quitCompleted')}
            value={count.toLocaleString()}
            icon={<UserX className="size-6 text-white" />}
            iconColor="bg-blue-400"
        />
    );
});
