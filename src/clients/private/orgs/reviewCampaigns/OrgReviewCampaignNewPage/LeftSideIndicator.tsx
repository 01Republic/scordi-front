import React from 'react';
import {cn} from '^public/lib/utils';
import {useReviewCampaignCreateStep} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignNewPage/atom';

interface LeftSideIndicatorProps {}

export const LeftSideIndicator = (props: LeftSideIndicatorProps) => {
    const {steps, focusedStep, changeStep, setFoldStep} = useReviewCampaignCreateStep();

    const step = focusedStep?.step || 1;
    const stepHeight = `${((step - 1) / 2) * 100}%`;

    return (
        <div className="flex flex-col items-stretch">
            <div className="flex flex-col gap-8 relative">
                {leftSideIndicatorSteps.map((stepItem, i) => {
                    const isActive = stepItem.step === step;

                    return (
                        <div key={i} className="flex items-center relative z-10">
                            <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-12 ${
                                    stepItem.step > step ? 'bg-gray-400' : 'bg-scordi'
                                }`}
                            >
                                {stepItem.step}
                            </div>

                            <span
                                className={`ml-2 text-14 font-medium ${
                                    stepItem.step !== step ? 'text-gray-400' : 'text-scordi'
                                }`}
                            >
                                {stepItem.text}
                            </span>
                        </div>
                    );
                })}
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
