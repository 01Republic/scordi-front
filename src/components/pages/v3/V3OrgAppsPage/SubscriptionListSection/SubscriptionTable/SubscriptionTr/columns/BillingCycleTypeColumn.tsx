import {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {
    BillingCycleOptions,
    c_SubscriptionBillingCycleType,
    SubscriptionBillingCycleTypeValues,
    t_SubscriptionBillingCycleType,
} from '^models/Subscription/types/BillingCycleOptions';
import {useToast} from '^hooks/useToast';
import {subscriptionApi} from '^models/Subscription/api';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface BillingCycleTypeColumnProps {
    subscription: SubscriptionDto;
    onChange: (value: BillingCycleOptions) => any;
}

export const BillingCycleTypeColumn = memo((props: BillingCycleTypeColumnProps) => {
    const {toast} = useToast();
    const {subscription, onChange} = props;

    const onSelect = async (billingCycleType: BillingCycleOptions) => {
        if (billingCycleType == subscription.billingCycleType) return;

        return subscriptionApi
            .update(subscription.id, {billingCycleType})
            .then(() => onChange(billingCycleType))
            .finally(() => toast.success('수정했습니다'));
    };

    return (
        <SelectColumn
            value={subscription.billingCycleType}
            getOptions={async () => SubscriptionBillingCycleTypeValues}
            onSelect={onSelect}
            ValueComponent={BillingCycleTypeTag}
            contentMinWidth="240px"
            optionListBoxTitle="결제주기를 수정합니다"
            inputDisplay={false}
        />
    );
});
BillingCycleTypeColumn.displayName = 'BillingCycleTypeColumn';

const BillingCycleTypeTag = memo((props: {value: BillingCycleOptions | string}) => {
    const {value} = props;
    const colorClass = c_SubscriptionBillingCycleType(value as BillingCycleOptions);
    const text = t_SubscriptionBillingCycleType(value as BillingCycleOptions);

    return <TagUI className={colorClass}>{text}</TagUI>;
});
