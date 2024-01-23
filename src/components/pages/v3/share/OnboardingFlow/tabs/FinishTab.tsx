import {memo} from 'react';
import {onboardingFlowStepStatus, OnboardingStep} from '../atom';
import {StepTab} from './StepTab';
import {useRecoilValue} from 'recoil';

export const FinishTab = memo(function FinishTab() {
    const step = useRecoilValue(onboardingFlowStepStatus);

    return (
        <StepTab steps={[OnboardingStep.Finish]} num={3} checked={step === 6}>
            <div>준비 완료</div>
        </StepTab>
    );
});
