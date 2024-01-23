import {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {useFunnel} from '^components/util/funnel';
import {isLoadedState, onboardingFlowStepStatus, onboardingModalIsShow, OnboardingStep} from './atom';
import {OnboardingSkippedStore, SkipButton, SkippedStoreStatus} from './SkipButton';
import {StepNavigator} from './StepNavigator';
import {StepContent} from './StepContent';
import {reportState} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/atom';

export const OnboardingFlow = memo(function OnboardingFlow() {
    const [isShow, setIsShow] = useRecoilState(onboardingModalIsShow);
    const currentOrg = useRecoilValue(currentOrgAtom);
    const isLoaded = useRecoilValue(isLoadedState);
    const {step, setStep} = useFunnel(onboardingFlowStepStatus);
    const resetReportData = useResetRecoilState(reportState);

    const invoiceAccounts = currentOrg?.invoiceAccounts || [];

    useEffect(() => {
        if (typeof window == 'undefined' || !currentOrg) return;

        // 이 조직이 온보딩을 끝냈다면, 패스합니다.
        if (currentOrg.isOnboardingFinished()) return;

        // 이 조직이 워크스페이스 또는 인보이스 계정이 연동했다면 패스합니다.
        if (currentOrg.lastGoogleSyncHistory || invoiceAccounts.length) return;

        const workspaceSkipStore = new OnboardingSkippedStore(SkippedStoreStatus.WorkspaceSkip);
        const invoiceSkipStore = new OnboardingSkippedStore(SkippedStoreStatus.InvoiceSkip);
        const workspaceSkipped = workspaceSkipStore.checkSkip(currentOrg.id);
        const invoiceSkipped = invoiceSkipStore.checkSkip(currentOrg.id);

        // 연동 2단계(인보이스)가 스킵된 상태라면, 패스합니다.
        if (invoiceSkipped) return;

        // 여기서부터는 반드시 온보딩이 노출됩니다.
        setIsShow(true);

        setTimeout(() => {
            document.body.classList.add('modal-opened');
        }, 200);

        if (workspaceSkipped) {
            // 연동 1단계(워크스페이스)가 패스된 상태라면,
            // 온보딩 2단계를 노출합니다.
            setStep(OnboardingStep.ConnectInvoiceAccount_BeforeLoad);
        } else {
            // 연동 1단계(워크스페이스)가 패스된 상태가 아니라면,
            // 연동 1단계(워크스페이스)가 완료되었는지 확인하고,
            if (currentOrg.isSyncedWithGoogleWorkspace()) {
                // 완료된 경우, 온보딩 2단계를 노출합니다.
                setStep(OnboardingStep.ConnectInvoiceAccount_BeforeLoad);
            } else {
                if (currentOrg.lastGoogleSyncHistory) return;

                // 완료되지 않은 경우, 온보딩 1단계를 노출합니다.
                setStep(OnboardingStep.ConnectWorkspace_BeforeLoad);
            }
        }
    }, [currentOrg]);

    useEffect(() => {
        setStep(0);
        resetReportData();
    }, [isShow]);

    if (!isShow) return <></>;

    return (
        <div className={`modal modal-open`}>
            <div className="modal-box h-full min-w-full max-h-full rounded-none p-0">
                <SkipButton
                    onClick={() => {
                        if (typeof window == 'undefined') return;

                        const workspaceSkipStore = new OnboardingSkippedStore(SkippedStoreStatus.WorkspaceSkip);
                        const invoiceSkipStore = new OnboardingSkippedStore(SkippedStoreStatus.InvoiceSkip);

                        if (!currentOrg) return; // currentOrg is logically exists in this time.

                        const closeModal = () => {
                            setIsShow(false);
                            document.body.classList.remove('modal-opened');
                        };

                        if (step === OnboardingStep.ConnectWorkspace_BeforeLoad) {
                            invoiceAccounts?.length && closeModal();

                            // 워크스페이스 연동 스킵
                            workspaceSkipStore.add(currentOrg.id);
                            setStep(OnboardingStep.ConnectInvoiceAccount_BeforeLoad);
                            return;
                        }

                        if (step === OnboardingStep.ConnectInvoiceAccount_BeforeLoad) {
                            // 인보이스 연동 스킵
                            invoiceSkipStore.add(currentOrg.id);
                            closeModal();
                            return;
                        }

                        closeModal();
                    }}
                    disabled={isLoaded || step === OnboardingStep.ConnectInvoiceAccount_AfterLoad}
                />
                <div className="h-full flex flex-col">
                    <StepNavigator />
                    <StepContent />
                </div>
            </div>
        </div>
    );
});
