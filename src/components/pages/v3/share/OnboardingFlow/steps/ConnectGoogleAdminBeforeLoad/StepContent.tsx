import {useSetRecoilState} from 'recoil';
import {
    ConnectGoogleAdminBeforeLoad,
    getAccessTokenFromLocalStorage,
    getReportFromLocalStorage,
} from '^v3/share/OnboardingFlow/steps';
import {ONBOARDING_STEP, onboardingFlowStepStatus} from '^v3/share/OnboardingFlow/atom';

export function ConnectGoogleAdminBeforeLoadStepContent() {
    const setStep = useSetRecoilState(onboardingFlowStepStatus);
    const {Workspace} = ONBOARDING_STEP;

    return (
        <ConnectGoogleAdminBeforeLoad
            onNext={() => setStep(Workspace.isLoading)}
            onReady={() => {
                const accessToken = getAccessTokenFromLocalStorage();
                const report = getReportFromLocalStorage();

                if (accessToken && report) {
                    setStep(Workspace.afterLoad);
                }
            }}
        />
    );
}
