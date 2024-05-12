import {memo} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {createSubscriptionFormData, currentStepAtom} from './atom';
import {Steps} from './steps';

export const PrevNextButtons = memo(function PrevNextButtons() {
    // const orgId = useRecoilValue(orgIdParamState);
    const formData = useRecoilValue(createSubscriptionFormData);
    const [currentStep, setStep] = useRecoilState(currentStepAtom);

    const prev = (i: number) => i - 1;
    const next = (i: number) => i + 1;

    switch (currentStep) {
        case Steps.IsFreeTier:
            // 유/무료 선택
            return (
                <StepButtons
                    onNext={() => {
                        setStep(formData.isFreeTier ? Steps.PaymentMethod : Steps.RecurringCycle);
                    }}
                    isValid={typeof formData.isFreeTier === 'boolean'}
                />
            );
        case Steps.RecurringCycle:
            // 결제주기 선택
            return (
                <StepButtons
                    onPrev={() => setStep(Steps.IsFreeTier)}
                    onNext={() => setStep(next)}
                    isValid={typeof formData.billingCycleType !== 'undefined'}
                />
            );
        case Steps.SubscriptionInfo:
            // 구독정보 입력
            return (
                <StepButtons
                    onPrev={() => setStep(prev)}
                    onNext={() => setStep(next)}
                    isValid={
                        !!formData.currentBillingAmount?.amount &&
                        !!formData.currentBillingAmount?.currency &&
                        !!formData.billingCycleType
                    }
                />
            );
        case Steps.PaymentMethod:
            // 결제수단 설정
            return (
                <StepButtons
                    onPrev={() =>
                        setStep((i) => {
                            return formData.isFreeTier ? Steps.IsFreeTier : prev(i);
                        })
                    }
                    onNext={() => setStep(next)}
                    isValid={true}
                />
            );
        case Steps.InvoiceAccount:
            // 청구서 수신 메일 설정
            return <StepButtons onPrev={() => setStep(prev)} onNext={() => setStep(next)} isValid={true} />;
        default:
            return <></>;
    }
});

interface Props {
    onPrev?: () => any;
    onNext?: () => any;
    isValid?: boolean;
}

const StepButtons = memo((props: Props) => {
    const {onPrev, onNext, isValid = false} = props;

    return (
        <div className="absolute inset-x-0 bottom-0 border-t bg-white">
            <div className="container max-w-4xl mx-auto flex items-center justify-between py-2">
                {onPrev ? (
                    <button className="btn w-40 text-16" onClick={onPrev}>
                        이전
                    </button>
                ) : (
                    <div />
                )}
                {onNext && (
                    <button
                        className={`btn w-40 text-16 btn-scordi ${
                            isValid ? '' : 'btn-disabled !bg-scordi !text-white opacity-30'
                        }`}
                        onClick={() => isValid && onNext()}
                    >
                        다음
                    </button>
                )}
            </div>
        </div>
    );
});
