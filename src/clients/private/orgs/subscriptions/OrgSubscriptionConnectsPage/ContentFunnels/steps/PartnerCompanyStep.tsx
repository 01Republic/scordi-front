import {memo, useState} from 'react';
import {useRecoilState} from 'recoil';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {createSubscriptionFormData} from '../atom';
import {StepLayout} from '../_common/StepLayout';
import {InputSection} from '../inputs/InputSection';
import {FadeUp} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/_common/FadeUp';

// [**구독 등록 플로우 (수동) /** 파트너사 유무 질문](https://www.notion.so/92a26540cd4f4b9cb1c010dc629e6cf6?pvs=21)
// [**구독 등록 플로우 (수동) /** 파트너사 정보기입](https://www.notion.so/9182912d9f78451488d9384c3388730e?pvs=21)
export const PartnerCompanyStep = memo(function PartnerCompanyStep() {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);
    const [activeForm, setActiveForm] = useState(false);

    return (
        <StepLayout
            title={!activeForm ? `파트너사를 통해 계약된 구독인가요?` : '어떤 파트너사를 쓰고 있나요?'}
            desc={!activeForm ? `` : '구독 계약을 체결한 기업 및 담당자 정보를 입력해주세요.'}
        >
            {!activeForm && (
                <InputSection>
                    <ButtonGroupRadio
                        onChange={(option) => {
                            // setFormData((f) => ({...f, isFreeTier}));
                            // goNextStep(isFreeTier);
                            setActiveForm(option.value);
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
                <InputSection>[공사중] 파트너사 정보기입은 여기서 하게 될 거에요</InputSection>
            </FadeUp>
        </StepLayout>
    );
});
