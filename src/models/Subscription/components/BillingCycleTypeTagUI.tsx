import {
    BillingCycleOptions,
    c_SubscriptionBillingCycleType,
    t_SubscriptionBillingCycleType,
} from '^models/Subscription/types/BillingCycleOptions';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface BillingCycleTypeTagUIProps {
    value: BillingCycleOptions;
    short?: boolean;
    className?: string;
}

export const BillingCycleTypeTagUI = memo((props: BillingCycleTypeTagUIProps) => {
    const {value, className = '', short = false} = props;
    const {t} = useTranslation('subscription');
    const colorClass = c_SubscriptionBillingCycleType(value as BillingCycleOptions);
    const text = t_SubscriptionBillingCycleType(value as BillingCycleOptions, short, t);

    return <TagUI className={`${colorClass} ${className}`}>{text}</TagUI>;
});
BillingCycleTypeTagUI.displayName = 'BillingCycleTypeTagUI';
