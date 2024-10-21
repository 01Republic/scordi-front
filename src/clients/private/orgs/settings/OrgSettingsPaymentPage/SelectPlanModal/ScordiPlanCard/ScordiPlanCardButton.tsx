import React, {memo} from 'react';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';

interface ScordiPlanCardButtonProps {
    plan: ScordiPlanDto;
    onClick: () => any;
}

export const ScordiPlanCardButton = memo((props: ScordiPlanCardButtonProps) => {
    const {plan, onClick} = props;
    const {currentSubscription} = useCurrentScordiSubscription();

    if (
        currentSubscription?.scordiPlanId === plan.id ||
        (currentSubscription?.scordiPlan.priority == 1 && plan.priority === 1)
    ) {
        return <button className="btn bg-scordi-50 text-scordi w-full no-click">현재플랜</button>;
    }

    if (plan.isCustomInquired) {
        return (
            <button className="btn btn-gray-600 w-full" onClick={() => window.open('https://scordi.channel.io/home')}>
                상담받기
            </button>
        );
    }

    if (currentSubscription && plan.priority < currentSubscription.scordiPlan.priority) {
        return (
            <button className="btn btn-gray w-full" onClick={onClick}>
                변경하기
            </button>
        );
    }

    return (
        <button className="btn btn-scordi-500 w-full" onClick={onClick}>
            구독하기
        </button>
    );
});
ScordiPlanCardButton.displayName = 'ScordiPlanCardButton';
