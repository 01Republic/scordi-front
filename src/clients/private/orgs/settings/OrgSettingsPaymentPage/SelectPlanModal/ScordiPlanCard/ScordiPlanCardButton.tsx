import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {scordiSubscriptionScheduledListAtom as scheduledListAtom} from '^models/_scordi/ScordiSubscription/atom';
import {yyyy_mm_dd} from '^utils/dateTime';

interface ScordiPlanCardButtonProps {
    plan: ScordiPlanDto;
    onClick: () => any;
}

export const ScordiPlanCardButton = memo((props: ScordiPlanCardButtonProps) => {
    const {plan, onClick} = props;
    const {currentSubscription} = useCurrentScordiSubscription();
    const scheduledSubscriptions = useRecoilValue(scheduledListAtom);
    const scheduledItem = scheduledSubscriptions.find((s) => {
        return s.scordiPlanId === plan.id || (s.scordiPlan.priority == 1 && plan.priority == 1);
    });

    if (scheduledItem) {
        const startAt = yyyy_mm_dd(scheduledItem.startAt!, '. ');
        return (
            <button className="btn bg-scordi-50 text-scordi w-full flex flex-col gap-1 no-click opacity-50">
                <span className="text-12">{startAt}</span>
                <span>적용 예정</span>
            </button>
        );
    }

    if (
        currentSubscription?.scordiPlanId === plan.id ||
        (currentSubscription?.scordiPlan.priority == 1 && plan.priority == 1)
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
