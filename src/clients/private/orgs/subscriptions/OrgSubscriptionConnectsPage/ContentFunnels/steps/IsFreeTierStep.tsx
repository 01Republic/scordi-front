import {memo} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {createSubscriptionFormData, currentStepAtom} from '../atom';
import {StepLayout} from '../_common/StepLayout';
import {InputSection} from '../inputs/InputSection';

export const IsFreeTierStep = memo(function IsFreeTierStep() {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);
    const setStep = useSetRecoilState(currentStepAtom);

    const goNextStep = (isFreeTier: boolean) => setStep(isFreeTier ? 3 : 2);

    return (
        <StepLayout title="앱을 유료로 구독하고 있나요?" desc="유/무료 여부를 선택해주세요.">
            <InputSection>
                <ButtonGroupRadio
                    onChange={(option) => {
                        const isFreeTier = option.value;
                        setFormData((f) => ({...f, isFreeTier}));
                        goNextStep(isFreeTier);
                    }}
                    defaultValue={formData.isFreeTier}
                    options={[
                        {label: '무료', value: true},
                        {label: '유료', value: false},
                    ]}
                />
            </InputSection>
        </StepLayout>
    );
});
