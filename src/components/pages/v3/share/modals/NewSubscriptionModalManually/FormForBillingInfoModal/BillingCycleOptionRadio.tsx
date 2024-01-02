import {memo} from 'react';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {useRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';

export const BillingCycleOptionRadio = memo(function BillingCycleOptionRadio() {
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);

    const onChange = (billingCycleOption: BillingCycleOptions) => {
        setFormData((f) => ({...f, billingCycleOption}));
    };

    return (
        <ButtonGroupRadio
            onChange={(o) => onChange(o.value)}
            options={[
                {label: '매월', value: BillingCycleOptions.Monthly},
                {label: '매년', value: BillingCycleOptions.Yearly},
                {label: '일회성', value: BillingCycleOptions.Onetime},
            ]}
            defaultValue={formData.billingCycleOption}
        />
    );
});
