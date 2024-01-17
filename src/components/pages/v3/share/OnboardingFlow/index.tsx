import {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {isLoadedState, onboardingFlowStepStatus, onboardingModalIsShow, OnboardingStep} from './atom';
import {OnboardingSkippedStore, SkipButton, SkippedStoreStatus} from './SkipButton';
import {StepNavigator} from './StepNavigator';
import {StepContent} from './StepContent';
import {useFunnel} from '^components/util/funnel';

export const OnboardingFlow = memo(function OnboardingFlow() {
    const [isShow, setIsShow] = useRecoilState(onboardingModalIsShow);
    const currentOrg = useRecoilValue(currentOrgAtom);
    const isLoaded = useRecoilValue(isLoadedState);
    const {step, setStep} = useFunnel(onboardingFlowStepStatus);

    useEffect(() => {
        if (typeof window == 'undefined') return;

        if (!currentOrg) return;

        const workspaceSkipStore = new OnboardingSkippedStore(SkippedStoreStatus.WorkspaceSkip);
        const invoiceSkipStore = new OnboardingSkippedStore(SkippedStoreStatus.InvoiceSkip);

        const workspaceSkip = workspaceSkipStore.checkSkip(currentOrg.id);
        const invoiceSkip = invoiceSkipStore.checkSkip(currentOrg.id);

        if (!workspaceSkip || !invoiceSkip) {
            setIsShow(true);
            setTimeout(() => {
                window.document.body.classList.add('modal-opened');
            }, 200);

            if (!workspaceSkip) return setStep(OnboardingStep.ConnectWorkspace_BeforeLoad);
            if (!invoiceSkip) return setStep(OnboardingStep.ConnectInvoiceAccount_BeforeLoad);
        }
    }, [currentOrg]);

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

                        if (step === OnboardingStep.ConnectWorkspace_BeforeLoad) {
                            // 워크스페이스 연동 스킵
                            workspaceSkipStore.add(currentOrg.id, SkippedStoreStatus.WorkspaceSkip);
                            setStep(OnboardingStep.ConnectInvoiceAccount_BeforeLoad);
                            return;
                        }

                        if (step === OnboardingStep.ConnectInvoiceAccount_BeforeLoad) {
                            // 인보이스 연동 스킵
                            invoiceSkipStore.add(currentOrg.id, SkippedStoreStatus.InvoiceSkip);
                            setIsShow(false);
                            const bodyTag = document.querySelector('body');
                            bodyTag?.classList.remove('modal-opened');
                            return;
                        }
                    }}
                    disabled={isLoaded || step === OnboardingStep.ConnectInvoiceAccount_AfterLoad}
                />
                <div className="h-full flex flex-col">
                    <StepNavigator />
                    {currentOrg && !currentOrg.lastGoogleSyncHistoryId && <StepContent />}
                </div>
            </div>
        </div>
    );
});
