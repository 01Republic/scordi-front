import React, {memo, ReactNode} from 'react';
import {PureLayoutContainerSection} from '^clients/private/_layouts/PureLayout/PureLayoutContainerSection';
import {NextStepButton} from '../../../common/NextStepButton';

interface StepCTASectionProps {
    disabled?: boolean;
    disabledCTAButtonText?: string;
    nextButtonText?: ReactNode;
    isLoading?: boolean;
    allConnected: boolean;
    notSelected: boolean;
    onBack?: () => any;
    onNext?: () => any;
    onReset?: () => any;
}

export const StepCTASection = memo((props: StepCTASectionProps) => {
    const {
        isLoading,
        allConnected,
        disabled,
        notSelected,
        onBack,
        onReset,
        onNext,
        disabledCTAButtonText,
        nextButtonText,
    } = props;

    return (
        <PureLayoutContainerSection className="max-w-full sticky bottom-0 py-4 bg-layout-background flex items-center justify-center">
            {isLoading ? (
                <NextStepButton text="불러오는중" disabled />
            ) : allConnected ? (
                <NextStepButton text="처음으로" onClick={onReset || onBack} />
            ) : (
                <NextStepButton
                    // 선택된 항목 유무에 따라 결정
                    disabled={notSelected}
                    onClick={onNext}
                    text={(() => {
                        if (disabled) return disabledCTAButtonText || '완료';
                        return nextButtonText || '다음';
                    })()}
                />
            )}
        </PureLayoutContainerSection>
    );
});
StepCTASection.displayName = 'StepCTASection';
