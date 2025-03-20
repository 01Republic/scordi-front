import {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {StepLayout} from '../_common/StepLayout';
import {PaymentMethodSelectCreditCard} from '../inputs/PaymentMethod/PaymentMethodSelectCreditCard';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {InputSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs';
import {PaymentMethodSelectBankAccount} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PaymentMethod/PaymentMethodSelectBankAccount';
import {createSubscriptionFormData} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/atom';

enum MethodType {
    CREDIT_CARD = 'CREDIT_CARD',
    BANK_ACCOUNT = 'BANK_ACCOUNT',
}

export const PaymentMethod = memo(function PaymentMethod() {
    const [selectedMethod, setSelectedMethod] = useState<MethodType | null>(null);
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);

    useEffect(() => {
        if (!!formData.bankAccountId && !formData.creditCardId) {
            setSelectedMethod(MethodType.BANK_ACCOUNT);
        } else if (!!formData.creditCardId) {
            setSelectedMethod(MethodType.CREDIT_CARD);
        }
    }, []);

    return (
        <StepLayout title="어떤 결제수단을 통해 지출되나요?" desc="결제 방식을 선택해주세요.">
            <InputSection>
                <ButtonGroupRadio
                    options={[
                        {label: '신용카드', value: MethodType.CREDIT_CARD},
                        {label: '계좌이체', value: MethodType.BANK_ACCOUNT},
                    ]}
                    defaultValue={selectedMethod}
                    onChange={(option) => {
                        setSelectedMethod(option.value as MethodType);
                        setFormData((f) => ({
                            ...f,
                            creditCardId: null,
                            bankAccountId: null,
                        }));
                    }}
                />
            </InputSection>

            {/* 카드 선택 */}
            {selectedMethod === MethodType.CREDIT_CARD && (
                <>
                    <p className="tracking-[0.5px] text-gray-400 text-16 mb-4">구독이 결제되는 카드를 선택해주세요.</p>
                    <PaymentMethodSelectCreditCard />
                    {/* 숨김처리 */}
                    {/*<PaymentMethodSelectBankAccount readonly={true} />*/}
                </>
            )}

            {/* 계좌 선택 */}
            {selectedMethod === MethodType.BANK_ACCOUNT && (
                <>
                    <p className="tracking-[0.5px] text-gray-400 text-16 mb-4">구독이 결제되는 계좌를 선택해주세요.</p>
                    <PaymentMethodSelectBankAccount />
                </>
            )}
        </StepLayout>
    );
});
