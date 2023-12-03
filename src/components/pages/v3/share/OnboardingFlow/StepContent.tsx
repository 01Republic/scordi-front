import {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {useFunnel} from '^components/util/funnel';
import {onboardingFlowStepStatus, ONBOARDING_STEP, onboardingModalIsShow} from './atom';
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
    const setIsShow = useSetRecoilState(onboardingModalIsShow);
    const {Workspace, InvoiceAccount, Finish} = ONBOARDING_STEP;

    return (
        <section data-component="StepContent" className="">
            <Step name={Workspace.beforeLoad}>
                <ConnectGoogleAdminBeforeLoad
                    onNext={() => setStep(Workspace.isLoading)}
                    skip={() => setStep(Workspace.afterLoad)}
                />
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
                <FinishStep onNext={() => setIsShow(false)} />
            </Step>
        </section>
    );
});
