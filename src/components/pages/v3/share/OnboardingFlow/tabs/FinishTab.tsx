import {memo} from 'react';
import {OnboardingStep} from '../atom';
import {StepTab} from './StepTab';

export const FinishTab = memo(function FinishTab() {
    return (
        <StepTab steps={[OnboardingStep.Finish]} num={3}>
            <div>준비 완료</div>
        </StepTab>
    );
});
