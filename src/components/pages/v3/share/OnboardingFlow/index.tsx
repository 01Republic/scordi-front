import {memo, useEffect, useState} from 'react';
import {useFunnel} from '^components/util/funnel';
import {onboardingFlowStepStatus} from './atom';
import {StepNavigator} from './StepNavigator';
import {StepContent} from './StepContent';

export const OnboardingFlow = memo(function OnboardingFlow() {
    const {setStep, Step} = useFunnel(onboardingFlowStepStatus);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setIsShow(true);
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', (e) => {
                console.log(e);
            });
        }
    }, []);

    return (
        <div className={`modal ${isShow ? 'modal-open' : ''}`}>
            <div className="modal-box h-full min-w-full max-h-full rounded-none p-0">
                {/*<h3 className="font-bold text-lg">Congratulations random Internet user!</h3>*/}

                <div className="h-full flex flex-col">
                    <StepNavigator />
                    <StepContent />
                </div>
            </div>
        </div>
    );
});
