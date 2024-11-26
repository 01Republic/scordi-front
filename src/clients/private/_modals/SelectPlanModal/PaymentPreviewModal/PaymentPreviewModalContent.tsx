import React, {memo} from 'react';
import {ScordiPlanDto, t_planStepType} from '^models/_scordi/ScordiPlan/type';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {ScordiPaymentMethodDto} from '^models/_scordi/ScordiPaymentMethod/type';
import {KeyValue} from './KeyValue';
import {PaymentPreviewActiveRange} from './PaymentPreviewActiveRange';
import {PaymentMethodCard} from './PaymentMethodCard';
import {PriceTextWithStepSize} from './PriceTextWithStepSize';
import {yyyy_mm_dd} from '^utils/dateTime';

interface PaymentPreviewModalSubmitButtonProps {
    plan: ScordiPlanDto;
    currentSubscription: ScordiSubscriptionDto | null;
    paymentMethod?: ScordiPaymentMethodDto;
}

export const PaymentPreviewModalContent = memo((props: PaymentPreviewModalSubmitButtonProps) => {
    const {plan, currentSubscription, paymentMethod} = props;

    const startDate = getStartDate(plan, currentSubscription);

    const nextDate = plan.getNextDate(startDate);

    if (!nextDate) return <></>;

    const finshDate = () => {
        const updateDate = new Date(nextDate);
        updateDate.setDate(nextDate.getDate() - 1);
        return updateDate || '';
    };

    return (
        <section className="bg-[#f9f9f9] rounded-lg p-5">
            <div className="mb-6">
                <h4 className="text-lg">{plan.name}</h4>
            </div>
            <div className="flex flex-col gap-4">
                <KeyValue label="결제 주기">
                    {plan.stepSize <= 0 ? (
                        <div className="text-gray-400">반복 결제가 아닙니다.</div>
                    ) : (
                        <div>{plan.getStepText()} 마다</div>
                    )}
                </KeyValue>

                <KeyValue label="정상 금액">{plan.regularPrice.toLocaleString()}원</KeyValue>

                <KeyValue
                    label={
                        <div>
                            <div>할인 금액</div>
                            {plan.secretCode && <div className="text-12">쿠폰코드</div>}
                        </div>
                    }
                >
                    <div className="text-red-500 text-right">
                        <div>{(plan.price - plan.regularPrice).toLocaleString()}원</div>
                        {plan.secretCode && <div className="text-12">{plan.secretCode} 적용됨</div>}
                    </div>
                </KeyValue>

                <hr />

                <KeyValue label="적용 기간">
                    <PaymentPreviewActiveRange startDate={yyyy_mm_dd(startDate)} nextDate={yyyy_mm_dd(finshDate())} />
                </KeyValue>

                {nextDate && (
                    <KeyValue label="다음 결제일">
                        <div>{yyyy_mm_dd(nextDate)}</div>
                    </KeyValue>
                )}

                {paymentMethod && (
                    <KeyValue label="결제 수단">
                        <PaymentMethodCard paymentMethod={paymentMethod} />
                    </KeyValue>
                )}

                <hr />
                <KeyValue label="총 결제금액">
                    <div className="text-right font-semibold">
                        <div className="text-16">
                            <PriceTextWithStepSize text={`${plan.finalPrice.toLocaleString()}원`} plan={plan} />
                        </div>
                        <div className="text-gray-400 text-13">*VAT(10%) 포함</div>
                    </div>
                </KeyValue>
            </div>
        </section>
    );
});
PaymentPreviewModalContent.displayName = 'PaymentPreviewModalSubmitButton';

function getStartDate(plan: ScordiPlanDto, currentSubscription: ScordiSubscriptionDto | null) {
    const now = new Date();

    if (!currentSubscription) return now;

    if (currentSubscription.scordiPlan.priority > plan.priority || currentSubscription.scordiPlan.price > plan.price) {
        return currentSubscription.getNextDate() || now;
    }

    return now;
}
