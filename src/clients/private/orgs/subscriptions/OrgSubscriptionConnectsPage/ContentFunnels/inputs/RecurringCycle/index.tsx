import {memo, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {FadeUp} from '^components/FadeUp';
import {createSubscriptionFormData} from '../../atom';
import {InputSection} from '../InputSection';

interface RecurringCycleProps {}

export const RecurringCycle = memo((props: RecurringCycleProps) => {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);

    return (
        <FadeUp show={!formData.isFreeTier} delay="delay-[200ms]">
            <InputSection title="구독 주기">
                <ButtonGroupRadio
                    className=""
                    onChange={(option) => {
                        setFormData((f) => ({
                            ...f,
                            billingCycleType: option.value,
                        }));
                    }}
                    defaultValue={formData.billingCycleType}
                    options={[
                        {label: '월간', value: BillingCycleOptions.Monthly},
                        {label: '연간', value: BillingCycleOptions.Yearly},
                    ]}
                />
            </InputSection>
        </FadeUp>
    );
});
RecurringCycle.displayName = 'RecurringCycle';
