import React, {memo} from 'react';
import {ApiError, errorToast} from '^api/api';
import {useTossPayments} from '^hooks/useTossPayments';
import {useScordiPaymentMethodsInSettingPage} from '^models/_scordi/ScordiPaymentMethod/hook';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {PaymentPreviewModalHeader} from './PaymentPreviewModalHeader';
import {PaymentPreviewModalContent} from './PaymentPreviewModalContent';

interface PaymentPreviewModalProps {
    orgId: number;
    selectedPlan?: ScordiPlanDto;
    onClose: () => any;
    onSuccess: () => any;
    onFailure?: (e: ApiError) => any;
    onFinally?: () => any;
}

export const PaymentPreviewModal = memo((props: PaymentPreviewModalProps) => {
    const {orgId, selectedPlan: plan, onClose} = props;
    const {onSuccess, onFailure, onFinally} = props;
    const {currentSubscription, update} = useCurrentScordiSubscription();
    const {result} = useScordiPaymentMethodsInSettingPage();
    const {requestBillingAuth} = useTossPayments();

    const paymentMethod = result.items.find((item) => item.isActive);

    const createSubscription = (orgId: number, planId: number) => {
        return update(orgId, planId)
            .then(onSuccess)
            .catch((e: ApiError) => {
                errorToast(e);
                onFailure && onFailure(e);
            })
            .finally(onFinally);
    };

    const onClick = () => {
        if (!orgId || isNaN(orgId)) return;
        if (!plan) return;
        if (plan.id === currentSubscription?.scordiPlanId) return;

        // 일단 선택한 플랜이 무료면 구독변경만.
        if (plan.price === 0) return createSubscription(orgId, plan.id);

        // 유료일 때, 결제수단 있으면 생략 & 구독변경.
        if (paymentMethod) return createSubscription(orgId, plan.id);

        // 없으면 결제수단 등록.
        if (!paymentMethod) return requestBillingAuth(plan.id);
    };

    return (
        <AnimatedModal name="PaymentPreviewModal" open={!!plan} onClose={onClose}>
            <div className="relative mx-auto max-w-xl w-full">
                {plan && (
                    <div className={'bg-white rounded-2xl p-6 pt-5 flex flex-col'}>
                        <PaymentPreviewModalHeader className="mb-8" onClose={onClose} />

                        <main className="mb-6">
                            <PaymentPreviewModalContent
                                plan={plan}
                                currentSubscription={currentSubscription}
                                paymentMethod={paymentMethod}
                            />
                        </main>

                        <div className="mt-auto">
                            <button type="button" className="btn btn-block btn-scordi text-16" onClick={onClick}>
                                구독 결제
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AnimatedModal>
    );
});
PaymentPreviewModal.displayName = 'PaymentPreviewModal';
