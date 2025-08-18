import {SubscriptionDto} from '^models/Subscription/types';
import {useSeatCounter} from '^models/SubscriptionSeat/hook/useSeatCounter';
import {UserMinus} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {useCurrentSubscription} from '../../atom';
import {StatusCard} from '../../SubscriptionInfoTab/StatusCard';

export const useFinishTargetSeatCounter = (subscription: SubscriptionDto | null) => {
    return useSeatCounter(subscription, {isFinishTargetOnly: true});
};

export const FinishTargetSeatCounter = memo(() => {
    const {t} = useTranslation('subscription');
    const {currentSubscription} = useCurrentSubscription();
    const {count} = useFinishTargetSeatCounter(currentSubscription);

    return (
        <StatusCard
            label={t('detail.seatStatus.finishTarget')}
            value={count.toLocaleString()}
            icon={<UserMinus className="size-6 text-white" />}
            iconColor="bg-pink-400"
        />
    );
});
