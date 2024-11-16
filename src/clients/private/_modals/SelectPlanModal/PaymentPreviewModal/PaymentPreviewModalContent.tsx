import React, {memo} from 'react';
import {ScordiPlanDto, t_planStepType} from '^models/_scordi/ScordiPlan/type';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {ScordiPaymentMethodDto} from '^models/_scordi/ScordiPaymentMethod/type';
import {KeyValue} from './KeyValue';
import {PaymentPreviewActiveRange} from './PaymentPreviewActiveRange';
import {PaymentMethodCard} from './PaymentMethodCard';
import {PriceTextWithStepSize} from '^clients/private/_modals/SelectPlanModal/PaymentPreviewModal/PriceTextWithStepSize';

interface PaymentPreviewModalSubmitButtonProps {
    plan: ScordiPlanDto;
    currentSubscription: ScordiSubscriptionDto | null;
    paymentMethod?: ScordiPaymentMethodDto;
}

export const PaymentPreviewModalContent = memo((props: PaymentPreviewModalSubmitButtonProps) => {
    const {plan, currentSubscription, paymentMethod} = props;

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
                    <PaymentPreviewActiveRange plan={plan} currentSubscription={currentSubscription} />
                </KeyValue>

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
