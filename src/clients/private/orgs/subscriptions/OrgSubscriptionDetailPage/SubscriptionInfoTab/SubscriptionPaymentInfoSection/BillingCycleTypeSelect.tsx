import React, {memo} from 'react';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {BillingCycleOptions, SubscriptionBillingCycleTypeValues} from '^models/Subscription/types/BillingCycleOptions';
import {BillingCycleTypeTagUI} from '^models/Subscription/components';

interface BillingCycleSelectProps {
    billingCycle: BillingCycleOptions;
    onChange: (value: BillingCycleOptions) => any;
}

/**
 * 결제주기
 */
export const BillingCycleSelect = memo((props: BillingCycleSelectProps) => {
    const {billingCycle, onChange} = props;

    const onSelect = async (billingCycleType: BillingCycleOptions) => {
        onChange(billingCycleType);
    };

    return (
        <SelectColumn
            value={billingCycle}
            getOptions={async () => SubscriptionBillingCycleTypeValues}
            onSelect={onSelect}
            ValueComponent={BillingCycleTypeTag}
            contentMinWidth="240px"
            optionListBoxTitle="결제주기를 수정합니다"
            inputDisplay={false}
        />
    );
});
BillingCycleSelect.displayName = 'BillingCycleSelect';

const BillingCycleTypeTag = memo((props: {value: BillingCycleOptions | string}) => {
    const {value} = props;
    return <BillingCycleTypeTagUI value={value as BillingCycleOptions} />;
});
