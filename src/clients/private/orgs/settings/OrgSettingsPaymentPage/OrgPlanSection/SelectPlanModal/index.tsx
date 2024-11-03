import React, {memo, useEffect} from 'react';
import {IoClose} from '@react-icons/all-files/io5/IoClose';
import {useTossPayments} from '^hooks/useTossPayments';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {confirm2} from '^components/util/dialog';
import {useScordiPlanList} from '^models/_scordi/ScordiPlan/hook';
import {ScordiPlanDto, ScordiPlanStepType} from '^models/_scordi/ScordiPlan/type';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {useScordiPaymentMethodsInSettingPage} from '^models/_scordi/ScordiPaymentMethod/hook';
import {useScordiPaymentsInSettingPage} from '^models/_scordi/ScordiPayment/hook';
import {ScordiPlanTypeSwitch} from './ScordiPlanTypeSwitch';
import {ScordiSecretCodeInput} from './ScordiSecretCodeInput';
import {ScordiPlanCard} from './ScordiPlanCard';
import {LoadableBox} from '^components/util/loading';

interface SelectPlanModalProps {
    orgId: number;
    isOpened: boolean;
    onClose: () => void;
}

export const SelectPlanModal = memo(function SelectPlanModal(props: SelectPlanModalProps) {
    const {orgId, isOpened, onClose} = props;
    const {isLoading, scordiPlanList, fetch: fetchPlans} = useScordiPlanList();
    const {currentSubscription, update} = useCurrentScordiSubscription();
    const {result, reload: reloadPaymentMethods} = useScordiPaymentMethodsInSettingPage();
    const {reload: reloadPaymentHistories} = useScordiPaymentsInSettingPage();
    const {requestBillingAuth} = useTossPayments();

    // 현재 구독중인 플랜의 결제주기 또는 기본값
    const stepType = currentSubscription?.scordiPlan.stepType || ScordiPlanStepType.Month;

    const reloadResources = async () => {
        reloadPaymentMethods();
        reloadPaymentHistories();
    };

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!isOpened) return;

        fetchPlans({
            where: {isPublic: true, stepType},
            order: {priority: 'ASC'},
        });
    }, [orgId, isOpened, stepType]);

    const createSubscription = (orgId: number, planId: number) => {
        return update(orgId, planId).then(() => reloadResources()); //.then(() => reload(orgId));
    };

    const changePlan = (plan: ScordiPlanDto) => {
        const paymentMethod = result.items.find((item) => item.isActive);

        if (!orgId || isNaN(orgId)) return;
        if (plan.id === currentSubscription?.scordiPlanId) return;

        confirm2(`플랜 변경`, `구독중인 플랜을 변경할까요?`, 'warning').then((res) => {
            if (res.isConfirmed) {
                // 일단 선택한 플랜이 무료면 구독변경만.
                if (plan.price === 0) return createSubscription(orgId, plan.id);

                // 유료일 때, 결제수단 있으면 생략 & 구독변경.
                if (paymentMethod) return createSubscription(orgId, plan.id);

                // 없으면 결제수단 등록.
                requestBillingAuth(plan.id);
            }
        });
    };

    const groupedPlans = ScordiPlanDto.groupByPriority(scordiPlanList);

    return (
        <AnimatedModal open={isOpened} onClose={onClose}>
            <div className="relative mx-auto max-w-screen-lg w-full">
                <div className={'bg-white rounded-3xl p-12'}>
                    <div className={'flex justify-between items-center mb-6'}>
                        <h3>플랜 선택</h3>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-stroke-gray text-gray-500 hover:text-gray-900 transition-colors duration-200"
                        >
                            <IoClose size={32} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <ScordiPlanTypeSwitch />
                        <ScordiSecretCodeInput />
                    </div>

                    <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
                        <div className={'flex items-stretch gap-8'}>
                            {Object.entries(groupedPlans).map(([_priority, [plan]]) => (
                                <ScordiPlanCard key={plan.id} plan={plan} onClick={() => changePlan(plan)} />
                            ))}
                        </div>
                    </LoadableBox>
                </div>
            </div>
        </AnimatedModal>
    );
});
