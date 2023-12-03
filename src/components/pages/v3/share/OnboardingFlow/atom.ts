import {atom} from 'recoil';

export const onboardingModalIsShow = atom({
    key: 'onboardingModalIsShow',
    default: false,
});

export enum OnboardingStep {
    ConnectWorkspace_BeforeLoad,
    ConnectWorkspace_IsLoading,
    ConnectWorkspace_AfterLoad,
    ConnectInvoiceAccount_BeforeLoad,
    ConnectInvoiceAccount_IsLoading,
    ConnectInvoiceAccount_AfterLoad,
    Finish,
}

export const ONBOARDING_STEP = {
    Workspace: {
        beforeLoad: OnboardingStep.ConnectWorkspace_BeforeLoad,
        isLoading: OnboardingStep.ConnectWorkspace_IsLoading,
        afterLoad: OnboardingStep.ConnectWorkspace_AfterLoad,
    },
    InvoiceAccount: {
        beforeLoad: OnboardingStep.ConnectInvoiceAccount_BeforeLoad,
        isLoading: OnboardingStep.ConnectInvoiceAccount_IsLoading,
        afterLoad: OnboardingStep.ConnectInvoiceAccount_AfterLoad,
    },
    Finish: OnboardingStep.Finish,
};

export const onboardingFlowStepStatus = atom<OnboardingStep>({
    key: 'onboardingFlowStepStatus',
    default: OnboardingStep.ConnectWorkspace_BeforeLoad,
});
