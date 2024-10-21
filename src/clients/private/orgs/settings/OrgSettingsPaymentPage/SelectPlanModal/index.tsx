import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {IoClose} from '@react-icons/all-files/io5/IoClose';
import {useTossPayments} from '^hooks/useTossPayments';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {useScordiPlanList} from '^models/_scordi/ScordiPlan/hook';
import {ScordiPlanDto, ScordiPlanStepType} from '^models/_scordi/ScordiPlan/type';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {ScordiPlayTypeSwitch} from './ScordiPlayTypeSwitch';
import {ScordiPlanCard} from './ScordiPlanCard';

interface SelectPlanModalProps {
    isOpened: boolean;
    onClose: () => void;
}

export const SelectPlanModal = memo(function SelectPlanModal(props: SelectPlanModalProps) {
    const {isOpened, onClose} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {isLoading, scordiPlanList, fetch} = useScordiPlanList();
    const {currentSubscription, fetch: fetchCurrentSubscription} = useCurrentScordiSubscription();
    const {startBilling} = useTossPayments();

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        fetchCurrentSubscription(orgId).then((subscription) => {
            const stepType = subscription ? subscription.scordiPlan.stepType : ScordiPlanStepType.Month;
            fetch({
                where: {isPublic: true, stepType},
                order: {priority: 'ASC'},
            });
        });
    }, [orgId]);

    const changePlan = (plan: ScordiPlanDto) => {
        console.log('currentSubscription', currentSubscription?.scordiPlan.priority);
        console.log('plan', plan.priority);
        if (plan.id === currentSubscription?.scordiPlanId) return;
        // startBilling();
        // confirm2(`플랜 변경`, `구독중인 플랜을 변경할까요?`, 'warning').then((res) => {
        //     if (res.isConfirmed) {
        //         console.log('change plan to', plan);
        //         toast.success('플랜 변경이 완료되었습니다');
        //     }
        // });
    };

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

                    <div className="flex items-center justify-start mb-6">
                        <ScordiPlayTypeSwitch />
                    </div>

                    <div className={'flex items-stretch gap-8'}>
                        {scordiPlanList.map((plan, i) => (
                            <ScordiPlanCard key={i} plan={plan} onClick={() => changePlan(plan)} />
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedModal>
    );
});
