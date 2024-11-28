import React, {memo, useEffect, useState} from 'react';
import {IoClose} from '@react-icons/all-files/io5/IoClose';
import {useScordiPlanList} from '^models/_scordi/ScordiPlan/hook';
import {ScordiPlanDto, ScordiPlanStepType} from '^models/_scordi/ScordiPlan/type';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {LoadableBox} from '^components/util/loading';
import {ApiError} from '^api/api';
import {TossPaymentAuthCallbackProvider} from './TossPaymentAuthCallbackProvider';
import {ScordiSecretCodeInput} from './ScordiSecretCodeInput';
import {ScordiPlanCard} from './ScordiPlanCard';
import {ScordiPlanCardForFreeTrial} from './ScordiPlanCard/ScordiPlanCardForFreeTrial';
import {PaymentPreviewModal} from '^clients/private/_modals/SelectPlanModal/PaymentPreviewModal';
import {organizationApi} from '^models/Organization/api';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {oneDtoOf} from '^types/utils/response-of';
import {OrganizationDto} from '^models/Organization/type';

interface SelectPlanModalProps {
    orgId: number;
    isOpened: boolean;
    onClose: () => any;
    onSuccess: () => any;
    onFailure?: (e: ApiError) => any;
    onFinally?: () => any;
}

export const SelectPlanModal = memo(function SelectPlanModal(props: SelectPlanModalProps) {
    const {orgId, isOpened, onClose, onSuccess: _onSuccess, onFailure, onFinally} = props;
    const {isLoading, scordiPlanList, fetch: fetchPlans} = useScordiPlanList();
    const {currentSubscription, update} = useCurrentScordiSubscription();
    const [selectedPlan, setSelectedPlan] = useState<ScordiPlanDto>();
    const [scordiSubscriptions, setScordiSubscriptions] = useState<ScordiSubscriptionDto[]>([]);

    // 현재 구독중인 플랜의 결제주기 또는 기본값
    const stepType = currentSubscription?.scordiPlan.stepType || ScordiPlanStepType.Month;

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!isOpened) return;

        fetchPlans({
            where: {isPublic: true, stepType},
            order: {priority: 'ASC'},
        });

        if (!scordiSubscriptions.length) {
            organizationApi
                .show(orgId, {relations: ['scordiSubscriptions']})
                .then(oneDtoOf(OrganizationDto))
                .then((res) => res.data.scordiSubscriptions || [])
                .then(setScordiSubscriptions);
        }
    }, [orgId, isOpened, stepType]);

    // const createSubscription = (orgId: number, planId: number) => {
    //     return update(orgId, planId)
    //         .then(onSuccess)
    //         .catch((e: ApiError) => {
    //             errorToast(e);
    //             onFailure && onFailure(e);
    //         })
    //         .finally(onFinally);
    // };
    //
    // const changePlan = (plan: ScordiPlanDto) => {
    //     const paymentMethod = result.items.find((item) => item.isActive);
    //
    //     if (!orgId || isNaN(orgId)) return;
    //     if (plan.id === currentSubscription?.scordiPlanId) return;
    //
    //     confirm2(`플랜 변경`, `구독중인 플랜을 변경할까요?`, 'warning').then((res) => {
    //         if (res.isConfirmed) {
    //             // 일단 선택한 플랜이 무료면 구독변경만.
    //             if (plan.price === 0) return createSubscription(orgId, plan.id);
    //
    //             // 유료일 때, 결제수단 있으면 생략 & 구독변경.
    //             if (paymentMethod) return createSubscription(orgId, plan.id);
    //
    //             // 없으면 결제수단 등록.
    //             requestBillingAuth(plan.id);
    //         }
    //     });
    // };

    const groupedPlans = ScordiPlanDto.groupByPriority(scordiPlanList);

    const onSuccess = () => {
        setSelectedPlan(undefined);
        onClose();
        _onSuccess();
    };

    return (
        <>
            <TossPaymentAuthCallbackProvider
                orgId={orgId}
                onSuccess={onSuccess}
                onFailure={onFailure}
                onFinally={onFinally}
            />
            <AnimatedModal name="SelectPlanModal" open={isOpened} onClose={onClose}>
                <div className="relative mx-auto max-w-screen-lg w-full">
                    <PaymentPreviewModal
                        orgId={orgId}
                        selectedPlan={selectedPlan}
                        onClose={() => setSelectedPlan(undefined)}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        onFinally={onFinally}
                    />
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
                            {/*<ScordiPlanTypeSwitch />*/}
                            <div />
                            <ScordiSecretCodeInput />
                        </div>

                        <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
                            <div className={'flex items-stretch gap-8'}>
                                {Object.entries(groupedPlans).map(([_priority, [plan]]) => {
                                    if (!plan) return <></>;

                                    return plan.priority === 1 ? (
                                        <ScordiPlanCardForFreeTrial
                                            key={plan.id}
                                            scordiPlan={plan}
                                            scordiSubscriptions={scordiSubscriptions}
                                            onClick={() => setSelectedPlan(plan)}
                                        />
                                    ) : (
                                        <ScordiPlanCard
                                            key={plan.id}
                                            scordiPlan={plan}
                                            onClick={() => setSelectedPlan(plan)}
                                        />
                                    );
                                })}
                            </div>
                        </LoadableBox>
                    </div>
                </div>
            </AnimatedModal>
        </>
    );
});

export * from './TossPaymentAuthCallbackProvider';
