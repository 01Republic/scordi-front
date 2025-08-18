import {BillingCycleTypeTagUI} from '^models/Subscription/components';
import {BillingCycleOptions, SubscriptionBillingCycleTypeValues} from '^models/Subscription/types/BillingCycleOptions';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface BillingCycleSelectProps {
    billingCycle: BillingCycleOptions;
    onChange: (value: BillingCycleOptions) => any;
}

/**
 * 결제주기
 */
export const BillingCycleSelect = memo((props: BillingCycleSelectProps) => {
    const {t} = useTranslation('subscription');
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
            optionListBoxTitle={t('detail.paymentInfo.selectOptions.billingCycle') as string}
            inputDisplay={false}
        />
    );
});
BillingCycleSelect.displayName = 'BillingCycleSelect';

const BillingCycleTypeTag = memo((props: {value: BillingCycleOptions | string}) => {
    const {value} = props;
    return <BillingCycleTypeTagUI value={value as BillingCycleOptions} />;
});
