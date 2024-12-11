import React, {memo, useState} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {FadeUp} from '^components/FadeUp';
import {createSubscriptionFormData, currentStepAtom} from '../atom';
import {StepLayout} from '../_common/StepLayout';
import {InputSection} from '../inputs/InputSection';
import {PartnerCompanySelect} from '../inputs/PartnerCompanySelect';
import {Steps} from '../steps/steps.enum';

// [**구독 등록 플로우 (수동) /** 파트너사 유무 질문](https://www.notion.so/92a26540cd4f4b9cb1c010dc629e6cf6?pvs=21)
// [**구독 등록 플로우 (수동) /** 파트너사 정보기입](https://www.notion.so/9182912d9f78451488d9384c3388730e?pvs=21)
export const PartnerCompanyStep = memo(function PartnerCompanyStep() {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);
    const [activeForm, setActiveForm] = useState(!!formData.vendorCompanyId);
    const setCurrentStep = useSetRecoilState(currentStepAtom);

    return (
        <StepLayout
            title={!activeForm ? `파트너사(MSP)를 통해 계약된 서비스인가요?` : '어떤 파트너사를 쓰고 있나요?'}
            desc={!activeForm ? `` : '구독 계약을 체결한 기업 및 담당자 정보를 입력해주세요.'}
        >
            {!activeForm && (
                <InputSection>
                    <ButtonGroupRadio
                        onChange={(option) => {
                            setActiveForm(option.value);
                            if (!option.value) {
                                setFormData((f) => ({
                                    ...f,
                                    vendorCompanyId: undefined,
                                    vendorManagerId: undefined,
                                }));
                                setCurrentStep(Steps.Memo);
                            }
                        }}
                        defaultValue={activeForm}
                        options={[
                            {label: '예', value: true},
                            {label: '아니오', value: false},
                        ]}
                    />
                </InputSection>
            )}

            <FadeUp show={activeForm} delay="delay-[100ms]">
                <PartnerCompanySelect />
            </FadeUp>
        </StepLayout>
    );
});
