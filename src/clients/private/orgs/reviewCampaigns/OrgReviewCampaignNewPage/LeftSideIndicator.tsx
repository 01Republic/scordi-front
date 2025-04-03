import React from 'react';
import {cn} from '^public/lib/utils';

interface LeftSideIndicatorProps {
    step: number;
}

export const LeftSideIndicator = (props: LeftSideIndicatorProps) => {
    const {step} = props;
    const stepHeight = `${((step - 1) / 2) * 100}%`;

    return (
        <div className="flex flex-col items-center p-6 w-52">
            <h2 className="text-2xl font-bold text-gray-900 mb-12">요청 추가하기</h2>
            <div className="flex flex-col gap-8 relative">
                {leftSideIndicatorSteps.map((step) => (
                    <div className="flex items-center relative z-10">
                        <div
                            className={cn(
                                'w-5 h-5 flex items-center justify-center bg-scordi text-white font-bold rounded-full text-xs',
                                {['bg-gray-400']: step.step > props.step},
                            )}
                        >
                            {step.step}
                        </div>
                        <span
                            className={cn('ml-2 text-scordi font-semibold', {
                                ['text-gray-400']: step.step !== props.step,
                            })}
                        >
                            {step.text}
                        </span>
                    </div>
                ))}
                <div className="absolute left-2.5 transform -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gray-400">
                    <div className="absolute left-0 top-0 w-full bg-scordi" style={{height: stepHeight}}></div>
                </div>
            </div>
        </div>
    );
};

const leftSideIndicatorSteps = [
    {step: 1, text: '제목 및 내용 작성'},
    {step: 2, text: '요청할 대상 선택'},
    {step: 3, text: '제출 마감일 설정'},
];
