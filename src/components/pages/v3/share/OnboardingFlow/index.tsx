import {memo, useEffect} from 'react';
import {onboardingModalIsShow} from './atom';
import {StepNavigator} from './StepNavigator';
import {StepContent} from './StepContent';
import {useRecoilState} from 'recoil';

export const OnboardingFlow = memo(function OnboardingFlow() {
    const [isShow, setIsShow] = useRecoilState(onboardingModalIsShow);

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
