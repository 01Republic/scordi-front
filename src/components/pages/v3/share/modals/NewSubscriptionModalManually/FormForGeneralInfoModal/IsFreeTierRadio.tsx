import React, {memo} from 'react';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {RequiredFormControl} from '^components/util/form-control';
import {useRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {PricingModelOptions} from '^models/Subscription/types/PricingModelOptions';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';

export const IsFreeTierRadio = memo(function IsFreeTierRadio() {
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);

    const onChange = (isFreeTier: boolean) => {
        setFormData((f) => {
            const f2 = {...f, isFreeTier};
            if (!isFreeTier) {
                f2.billingCycleType = BillingCycleOptions.Monthly;
                f2.pricingModel = PricingModelOptions.PER_SEAT;
            }
            return f2;
        });
    };

    return (
        <RequiredFormControl topLeftLabel="유/무료 여부를 선택해주세요.">
            <ButtonGroupRadio
                defaultValue={formData.isFreeTier}
                onChange={(o) => onChange(o.value)}
                options={[
                    {label: '무료', value: true},
                    {label: '유료', value: false},
                ]}
            />
        </RequiredFormControl>
    );
});
