import {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {useFunnel} from '^components/util/funnel';
import {onboardingFlowStepStatus, ONBOARDING_STEP, onboardingModalIsShow} from './atom';
import {
    ConnectGoogleAdminBeforeLoadStepContent,
    ConnectGoogleAdminIsLoading,
    ConnectGoogleAdminAfterLoad,
    ConnectInvoiceAccountBeforeLoad,
    ConnectInvoiceAccountIsLoading,
    ConnectInvoiceAccountAfterLoad,
    FinishStep,
} from './steps';

export const StepContent = memo(function StepContent() {
    const {setStep, LazyStep} = useFunnel(onboardingFlowStepStatus);
    const setIsShow = useSetRecoilState(onboardingModalIsShow);
    const {Workspace, InvoiceAccount, Finish} = ONBOARDING_STEP;

    return (
        <section data-component="StepContent" className="grow">
            <LazyStep name={Workspace.beforeLoad} render={ConnectGoogleAdminBeforeLoadStepContent} />
            <LazyStep
                name={Workspace.isLoading}
                render={() => <ConnectGoogleAdminIsLoading onNext={() => setStep(Workspace.afterLoad)} />}
            />
            <LazyStep
                name={Workspace.afterLoad}
                render={() => <ConnectGoogleAdminAfterLoad onNext={() => setStep(InvoiceAccount.beforeLoad)} />}
            />
            <LazyStep
                name={InvoiceAccount.beforeLoad}
                render={() => (
                    <ConnectInvoiceAccountBeforeLoad
                        onPrev={() => setStep(Workspace.afterLoad)}
                        onNext={() => setStep(InvoiceAccount.isLoading)}
                    />
                )}
            />
            <LazyStep
                name={InvoiceAccount.isLoading}
                render={() => <ConnectInvoiceAccountIsLoading onNext={() => setStep(Finish)} />}
            />
            {/*<Step name={InvoiceAccount.afterLoad}>*/}
            {/*    <ConnectInvoiceAccountAfterLoad onNext={() => setStep(Finish)} />*/}
            {/*</Step>*/}
            <LazyStep name={Finish} render={() => <FinishStep onNext={() => setIsShow(false)} />} />
        </section>
    );
});
