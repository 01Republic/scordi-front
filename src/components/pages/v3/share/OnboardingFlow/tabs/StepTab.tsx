import {WithChildren} from '^types/global.type';
import {onboardingFlowStepStatus, OnboardingStep} from '^v3/share/OnboardingFlow/atom';
import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {Check, CheckCircle} from 'lucide-react';

interface StepTabProps extends WithChildren {
    steps: OnboardingStep[];
    num: number;
    available?: boolean;
    checked?: boolean;
    defaultStep?: OnboardingStep;
}

export const StepTab = memo((props: StepTabProps) => {
    const [currentStep, setStep] = useRecoilState(onboardingFlowStepStatus);
    const {steps, num, available = false, checked = false, defaultStep, children} = props;

    const isActive = steps.includes(currentStep);
    const defaultStepStatus = defaultStep || steps[0];

    return (
        <div
            onClick={() => available && setStep(defaultStepStatus)}
            className={`tab tab-bordered border-b-0 border-t-[3px] ${
                available ? 'cursor-pointer' : 'cursor-not-allowed !text-gray-400 opacity-50'
            } p-0 ${isActive && 'tab-active'} ${checked && '!border-t-success'}`}
        >
            <div
                className={`w-full text-left py-3 px-2 ${available && 'btn-animation'} ${checked && '!text-green-700'}`}
            >
                <div className="text-13 font-semibold flex items-center gap-2">
                    <span>Step {num}</span>
                    {checked && <Check size={20} className="relative top-[-3px]" />}
                </div>
                <div className="text-16 font-semibold">{children}</div>
            </div>
        </div>
    );
});
