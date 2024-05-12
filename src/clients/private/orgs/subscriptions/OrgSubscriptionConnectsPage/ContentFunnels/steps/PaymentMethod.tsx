import {memo} from 'react';
import {StepLayout} from '../_common/StepLayout';
import {PaymentMethodSelect} from '../inputs/PaymentMethod/PaymentMethodSelect';

export const PaymentMethod = memo(function PaymentMethod() {
    return (
        <StepLayout
            title="어떤 결제수단을 사용하고 있나요? 🔗"
            desc="구독을 지출하는 카드 또는 출금계좌를 선택해주세요."
        >
            <PaymentMethodSelect />
        </StepLayout>
    );
});
