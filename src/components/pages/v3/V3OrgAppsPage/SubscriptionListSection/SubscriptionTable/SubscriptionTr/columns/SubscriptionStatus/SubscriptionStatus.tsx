import {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {MoneyDto} from '^types/money.type';
import {SubscriptionStatusSelect} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns/SubscriptionStatus/SubscriptionStatusSelect';

interface SubscriptionStatusProps {
    subscription: SubscriptionDto;
    lastPaidAt: Date | null;
    nextPayDate: Date | null;
    nextPayAmount: MoneyDto | null;
}

export const SubscriptionStatus = memo((props: SubscriptionStatusProps) => {
    const {subscription} = props;

    return <SubscriptionStatusSelect subscription={subscription} />;
});
SubscriptionStatus.displayName = 'SubscriptionStatus';
