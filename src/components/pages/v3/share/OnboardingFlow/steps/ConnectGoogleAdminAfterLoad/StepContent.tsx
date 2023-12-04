import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {ONBOARDING_STEP, onboardingFlowStepStatus} from '../../atom';
import {ConnectGoogleAdminAfterLoad} from './index';

export const ConnectGoogleAdminAfterLoadStepContent = memo(function StepContent() {
    const [currentStep, setStep] = useRecoilState(onboardingFlowStepStatus);
    const {Workspace, InvoiceAccount, Finish} = ONBOARDING_STEP;

    if (currentStep !== Workspace.afterLoad) return <></>;

    return <ConnectGoogleAdminAfterLoad onNext={() => setStep(InvoiceAccount.beforeLoad)} />;
});
