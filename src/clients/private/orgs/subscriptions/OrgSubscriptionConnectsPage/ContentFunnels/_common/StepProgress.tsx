import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {StepProgressItem} from './StepProgressItem';
import {currentStepAtom} from '../atom';

interface StepProgressProps {
    //
}

export const StepProgress = memo((props: StepProgressProps) => {
    const {} = props;
    const [currentStep, setStep] = useRecoilState(currentStepAtom);

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
                {/* tab */}
                <div className="flex items-center gap-3">
                    <StepProgressItem text="구독 정보" active />
                    <StepProgressItem text="이용 멤버" />
                    <StepProgressItem text="담당자 & 파트너십 (선택)" />
                    <StepProgressItem text="등록 완료" last />
                </div>

                {/* progress counter */}
                <div className="flex items-center justify-center text-16 text-gray-400 tracking-[0.5px]">
                    {currentStep}/6
                </div>
            </div>

            <progress
                className="transition-all progress progress-primary h-[4px] bg-gray-100"
                max={6}
                value={currentStep}
            />
        </div>
    );
});
StepProgress.displayName = 'StepProgress';
