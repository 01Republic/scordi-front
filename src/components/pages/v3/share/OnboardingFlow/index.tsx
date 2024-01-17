import {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {isLoadedState, onboardingFlowStepStatus, onboardingModalIsShow, OnboardingStep} from './atom';
import {OnboardingSkippedStore, SkipButton, SkippedStoreStatus} from './SkipButton';
import {StepNavigator} from './StepNavigator';
import {StepContent} from './StepContent';
import {useFunnel} from '^components/util/funnel';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';

export const OnboardingFlow = memo(function OnboardingFlow() {
    const [isShow, setIsShow] = useRecoilState(onboardingModalIsShow);
    const currentOrg = useRecoilValue(currentOrgAtom);
    const isLoaded = useRecoilValue(isLoadedState);
    const {result, search} = useInvoiceAccounts();

    const invoiceAccounts = result.items;

    const {step, setStep} = useFunnel(onboardingFlowStepStatus);

    useEffect(() => {
        if (typeof window == 'undefined') return;

        if (!currentOrg) return;

        search({});

        const workspaceSkipStore = new OnboardingSkippedStore(SkippedStoreStatus.WorkspaceSkip);
        const invoiceSkipStore = new OnboardingSkippedStore(SkippedStoreStatus.InvoiceSkip);

        const workspaceSkip = workspaceSkipStore.checkSkip(currentOrg.id);
        const invoiceSkip = invoiceSkipStore.checkSkip(currentOrg.id);

        if ((!currentOrg.lastGoogleSyncHistory && !workspaceSkip) || (!invoiceSkip && !!invoiceAccounts.length)) {
            setIsShow(true);

            setTimeout(() => {
                window.document.body.classList.add('modal-opened');
            }, 200);

            if (!invoiceSkip && !!invoiceAccounts.length) {
                return setStep(OnboardingStep.ConnectInvoiceAccount_BeforeLoad);
            }
            if (!workspaceSkip && !currentOrg.lastGoogleSyncHistory) {
                return setStep(OnboardingStep.ConnectWorkspace_BeforeLoad);
            }
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

                        const closeModal = () => {
                            setIsShow(false);
                            const bodyTag = document.querySelector('body');
                            bodyTag?.classList.remove('modal-opened');
                        };

                        if (step === OnboardingStep.ConnectWorkspace_BeforeLoad) {
                            invoiceAccounts.length && closeModal();

                            // 워크스페이스 연동 스킵
                            workspaceSkipStore.add(currentOrg.id, SkippedStoreStatus.WorkspaceSkip);
                            setStep(OnboardingStep.ConnectInvoiceAccount_BeforeLoad);
                            return;
                        }

                        if (step === OnboardingStep.ConnectInvoiceAccount_BeforeLoad) {
                            // 인보이스 연동 스킵
                            invoiceSkipStore.add(currentOrg.id, SkippedStoreStatus.InvoiceSkip);
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
