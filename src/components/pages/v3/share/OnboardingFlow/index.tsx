import {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {isLoadedState, onboardingModalIsShow} from './atom';
import {OnboardingSkippedStore, SkipButton} from './SkipButton';
import {StepNavigator} from './StepNavigator';
import {StepContent} from './StepContent';
import {useRouter} from 'next/router';

export const OnboardingFlow = memo(function OnboardingFlow() {
    const [isShow, setIsShow] = useRecoilState(onboardingModalIsShow);
    const currentOrg = useRecoilValue(currentOrgAtom);
    const isLoaded = useRecoilValue(isLoadedState);
    const router = useRouter();

    useEffect(() => {
        if (typeof window == 'undefined') return;
        const skipStore = new OnboardingSkippedStore();
        console.log('skipStore.store', skipStore.store);
        if (currentOrg && !currentOrg.lastGoogleSyncHistoryId && !skipStore.checkSkip(currentOrg.id)) {
            setIsShow(true);
            setTimeout(() => {
                window.document.body.classList.add('modal-opened');
            }, 200);
        }
    }, [currentOrg]);

    if (!isShow) return <></>;

    return (
        <div className={`modal modal-open`}>
            <div className="modal-box h-full min-w-full max-h-full rounded-none p-0">
                <SkipButton
                    onClick={() => {
                        if (typeof window == 'undefined') return;
                        if (!currentOrg) return; // currentOrg is logically exists in this time.

                        const store = new OnboardingSkippedStore();
                        store.add(currentOrg.id);
                        setIsShow(false);

                        const bodyTag = document.querySelector('body');

                        bodyTag?.classList.remove('modal-opened');
                    }}
                    disabled={isLoaded}
                />
                <div className="h-full flex flex-col">
                    <StepNavigator />
                    {currentOrg && !currentOrg.lastGoogleSyncHistoryId && <StepContent />}
                </div>
            </div>
        </div>
    );
});
