import {memo, useEffect} from 'react';
import {onboardingModalIsShow} from './atom';
import {StepNavigator} from './StepNavigator';
import {StepContent} from './StepContent';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';

export const OnboardingFlow = memo(function OnboardingFlow() {
    const [isShow, setIsShow] = useRecoilState(onboardingModalIsShow);
    const currentOrg = useRecoilValue(currentOrgAtom);

    useEffect(() => {
        if (currentOrg && !currentOrg.lastGoogleSyncHistoryId) {
            setIsShow(true);
        }
    }, [currentOrg]);

    return (
        <div className={`modal ${isShow ? 'modal-open' : ''}`}>
            <div className="modal-box h-full min-w-full max-h-full rounded-none p-0">
                <div className="h-full flex flex-col">
                    <StepNavigator />
                    {currentOrg && !currentOrg.lastGoogleSyncHistoryId && <StepContent />}
                </div>
            </div>
        </div>
    );
});
