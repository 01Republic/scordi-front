import React, {memo} from 'react';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {FormControl} from '^components/util/form-control';
import {useRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {RecurringTypeOptions} from '^models/Subscription/types/RecurringTypeOptions';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';

export const IsFreeTierRadio = memo(function IsFreeTierRadio() {
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);

    const onChange = (isFreeTier: boolean) => {
        setFormData((f) => {
            const f2 = {...f, isFreeTier};
            if (!isFreeTier) {
                f2.billingCycleType = BillingCycleOptions.Monthly;
                f2.recurringType = RecurringTypeOptions.PER_SEAT;
            }
            return f2;
        });
    };

    return (
        <FormControl topLeftLabel="유료로 쓰고 있나요?">
            <ButtonGroupRadio
                defaultValue={formData.isFreeTier}
                onChange={(o) => onChange(o.value)}
                options={[
                    {label: '무료', value: true},
                    {label: '유료', value: false},
                ]}
            />
        </FormControl>
    );
});
