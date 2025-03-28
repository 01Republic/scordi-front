import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {currentStepAtom} from '../atom';
import {Steps} from '../steps';
import {StepProgressItem} from './StepProgressItem';

interface StepProgressProps {
    //
}

export const StepProgress = memo((props: StepProgressProps) => {
    const {} = props;
    const [currentStep, setStep] = useRecoilState(currentStepAtom);
    const totalLength = Object.values(Steps)
        .filter((v) => typeof v === 'number')
        .reverse()[0];

    return (
        <div className="w-full flex flex-col gap-2 sticky top-0 pt-[40px] bg-white z-[2]">
            <div className="flex justify-end">
                {/* progress counter */}
                <div className="flex items-center justify-center text-16 text-gray-400 tracking-[0.5px]">
                    {currentStep}/{totalLength}
                </div>
            </div>

            <progress
                className="transition-all progress progress-primary h-[4px] bg-gray-100
                [&::-webkit-progress-value]:bg-primaryColor-900"
                max={totalLength}
                value={currentStep}
            />
        </div>
    );
});
StepProgress.displayName = 'StepProgress';
