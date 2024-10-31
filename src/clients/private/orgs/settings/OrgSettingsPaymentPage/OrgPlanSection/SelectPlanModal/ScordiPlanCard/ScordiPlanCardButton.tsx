import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {scordiSubscriptionScheduledListAtom as scheduledListAtom} from '^models/_scordi/ScordiSubscription/atom';
import {yyyy_mm_dd} from '^utils/dateTime';
import {confirm2} from '^components/util/dialog';
import {scordiSubscriptionApi} from '^models/_scordi/ScordiSubscription/api';
import {toast} from 'react-hot-toast';

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
            <>
                <p className="text-right">
                    <span className="text-12 text-scordi">{startAt} 부터</span>
                </p>
                <button
                    onClick={() =>
                        confirm2('예정된 플랜을 취소할까요?').then((res) => {
                            if (res.isConfirmed) {
                                // scordiSubscriptionApi
                                toast.success('취소했어요');
                            }
                        })
                    }
                    className="btn bg-scordi-50 text-scordi w-full hover:bg-red-200 hover:text-red-600 border-none group"
                >
                    <span className="block group-hover:hidden">다음플랜</span>
                    <span className="hidden group-hover:block">취소</span>
                </button>
            </>
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
