import {memo} from 'react';
import {
    BillingCycleOptions,
    c_SubscriptionBillingCycleType,
    t_SubscriptionBillingCycleType,
} from '^models/Subscription/types/BillingCycleOptions';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface BillingCycleTypeTagUIProps {
    value: BillingCycleOptions;
}

export const BillingCycleTypeTagUI = memo((props: BillingCycleTypeTagUIProps) => {
    const {value} = props;
    const colorClass = c_SubscriptionBillingCycleType(value as BillingCycleOptions);
    const text = t_SubscriptionBillingCycleType(value as BillingCycleOptions);

    return <TagUI className={colorClass}>{text}</TagUI>;
});
BillingCycleTypeTagUI.displayName = 'BillingCycleTypeTagUI';
