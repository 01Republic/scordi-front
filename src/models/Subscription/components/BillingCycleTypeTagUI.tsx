import {memo} from 'react';
import {
    BillingCycleOptions,
    c_SubscriptionBillingCycleType,
    t_SubscriptionBillingCycleType,
} from '^models/Subscription/types/BillingCycleOptions';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface BillingCycleTypeTagUIProps {
    value: BillingCycleOptions;
    short?: boolean;
}

export const BillingCycleTypeTagUI = memo((props: BillingCycleTypeTagUIProps) => {
    const {value, short = false} = props;
    const colorClass = c_SubscriptionBillingCycleType(value as BillingCycleOptions);
    const text = t_SubscriptionBillingCycleType(value as BillingCycleOptions, short);

    return <TagUI className={colorClass}>{text}</TagUI>;
});
BillingCycleTypeTagUI.displayName = 'BillingCycleTypeTagUI';
