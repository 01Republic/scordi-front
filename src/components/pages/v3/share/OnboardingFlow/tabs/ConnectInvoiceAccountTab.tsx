import {memo} from 'react';
import {OnboardingStep} from '../atom';
import {StepTab} from './StepTab';

export const ConnectInvoiceAccountTab = memo(function ConnectInvoiceAccountTab() {
    return (
        <StepTab
            steps={[
                OnboardingStep.ConnectInvoiceAccount_BeforeLoad,
                OnboardingStep.ConnectInvoiceAccount_IsLoading,
                OnboardingStep.ConnectInvoiceAccount_AfterLoad,
            ]}
            num={2}
            available
        >
            <div>결제메일 계정 연동</div>
        </StepTab>
    );
});
