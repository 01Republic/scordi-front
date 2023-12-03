import {memo} from 'react';
import {useFunnel} from '^components/util/funnel';
import {onboardingFlowStepStatus, ONBOARDING_STEP} from './atom';
import {
    ConnectGoogleAdminBeforeLoad,
    ConnectGoogleAdminIsLoading,
    ConnectGoogleAdminAfterLoad,
    ConnectInvoiceAccountBeforeLoad,
    ConnectInvoiceAccountIsLoading,
    ConnectInvoiceAccountAfterLoad,
    FinishStep,
} from './steps';

export const StepContent = memo(function StepContent() {
    const {setStep, Step} = useFunnel(onboardingFlowStepStatus);
    const {Workspace, InvoiceAccount, Finish} = ONBOARDING_STEP;

    return (
        <section data-component="StepContent" className="">
            <Step name={Workspace.beforeLoad}>
                <ConnectGoogleAdminBeforeLoad onNext={() => setStep(Workspace.isLoading)} />
            </Step>
            <Step name={Workspace.isLoading}>
                <ConnectGoogleAdminIsLoading onNext={() => setStep(Workspace.afterLoad)} />
            </Step>
            <Step name={Workspace.afterLoad}>
                <ConnectGoogleAdminAfterLoad onNext={() => setStep(InvoiceAccount.beforeLoad)} />
            </Step>
            <Step name={InvoiceAccount.beforeLoad}>
                <ConnectInvoiceAccountBeforeLoad
                    onPrev={() => setStep(Workspace.afterLoad)}
                    onNext={() => setStep(InvoiceAccount.isLoading)}
                />
            </Step>
            <Step name={InvoiceAccount.isLoading}>
                {/*<ConnectInvoiceAccountIsLoading onNext={() => setStep(InvoiceAccount.afterLoad)} />*/}
                <ConnectInvoiceAccountIsLoading onNext={() => setStep(Finish)} />
            </Step>
            <Step name={InvoiceAccount.afterLoad}>
                <ConnectInvoiceAccountAfterLoad onNext={() => setStep(Finish)} />
            </Step>
            <Step name={Finish}>
                <FinishStep onNext={() => setStep(Workspace.beforeLoad)} />
            </Step>
        </section>
    );
});
