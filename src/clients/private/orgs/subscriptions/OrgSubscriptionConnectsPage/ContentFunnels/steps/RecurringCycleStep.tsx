import {memo} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {createSubscriptionFormData, currentStepAtom} from '../atom';
import {StepLayout} from '../_common/StepLayout';
import {InputSection} from '../inputs/InputSection';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';

export const RecurringCycleStep = memo(function RecurringCycleStep() {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);
    const setStep = useSetRecoilState(currentStepAtom);

    const goNextStep = () => setStep(3);

    return (
        <StepLayout
            title="구독이 갱신되는 주기는 어떻게 되나요?"
            desc="연간 구독을 하고 월 단위로 과금되는 구조라면 연간을 선택해주세요."
        >
            <InputSection>
                <ButtonGroupRadio
                    onChange={(option) => {
                        setFormData((f) => ({
                            ...f,
                            billingCycleType: option.value,
                        }));
                        goNextStep();
                    }}
                    defaultValue={formData.billingCycleType}
                    options={[
                        {label: '월간', value: BillingCycleOptions.Monthly},
                        {label: '연간', value: BillingCycleOptions.Yearly},
                        {label: '일회성', value: BillingCycleOptions.Onetime},
                    ]}
                />
            </InputSection>
        </StepLayout>
    );
});
