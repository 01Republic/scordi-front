import {memo} from 'react';
import {OnboardingStep} from '../atom';
import {StepTab} from './StepTab';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';

export const ConnectInvoiceAccountTab = memo(function ConnectInvoiceAccountTab() {
    const currentOrg = useRecoilValue(currentOrgAtom);

    return (
        <StepTab
            steps={[
                OnboardingStep.ConnectInvoiceAccount_BeforeLoad,
                OnboardingStep.ConnectInvoiceAccount_IsLoading,
                OnboardingStep.ConnectInvoiceAccount_AfterLoad,
            ]}
            num={2}
            available
            checked={!!currentOrg?.invoiceAccounts?.length}
        >
            <div>결제메일 계정 연동</div>
        </StepTab>
    );
});
