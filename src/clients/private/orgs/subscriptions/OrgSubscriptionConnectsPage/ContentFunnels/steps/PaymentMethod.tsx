import {memo} from 'react';
import {StepLayout} from '../_common/StepLayout';
import {PaymentMethodSelect} from '../inputs/PaymentMethod/PaymentMethodSelect';

export const PaymentMethod = memo(function PaymentMethod() {
    return (
        <StepLayout title="어떤 결제수단을 통해 지출되나요?" desc="구독이 결제되는 카드 또는 계좌를 선택해주세요.">
            <PaymentMethodSelect />
        </StepLayout>
    );
});
