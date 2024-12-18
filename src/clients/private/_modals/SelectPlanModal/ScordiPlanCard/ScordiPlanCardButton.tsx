import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {scordiSubscriptionScheduledListAtom as scheduledListAtom} from '^models/_scordi/ScordiSubscription/atom';
import {yyyy_mm_dd} from '^utils/dateTime';
import {confirm2} from '^components/util/dialog';
import {scordiSubscriptionApi} from '^models/_scordi/ScordiSubscription/api';
import {toast} from 'react-hot-toast';
import {LinkTo} from '^components/util/LinkTo';
import {ChannelTalk_Url} from '^config/constants';

interface ScordiPlanCardButtonProps {
    plan: ScordiPlanDto;
    onClick?: () => any;
}

export const ScordiPlanCardButton = memo((props: ScordiPlanCardButtonProps) => {
    const {plan, onClick} = props;
    const {currentSubscription} = useCurrentScordiSubscription();
    const scheduledSubscriptions = useRecoilValue(scheduledListAtom);
    const scheduledItem = scheduledSubscriptions.find((s) => {
        return s.scordiPlanId === plan.id; // || (s.scordiPlan.priority == 1 && plan.priority == 1);
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
                                toast.success('예정된 플랜을 취소 했어요');
                            }
                        })
                    }
                    className="btn bg-scordi-50 text-scordi w-full no-animation btn-animation hover:bg-red-200 hover:text-red-600 border-none group"
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
        return (
            <button className="btn bg-scordi-50 text-scordi w-full no-animation btn-animation no-click">
                현재플랜
            </button>
        );
    }

    if (plan.isCustomInquired) {
        return (
            <LinkTo
                href={ChannelTalk_Url}
                className="btn btn-gray-600 w-full no-animation btn-animation"
                target="_blank"
            >
                상담받기
            </LinkTo>
        );
    }

    if (currentSubscription) {
        if (plan.priority < currentSubscription.scordiPlan.priority) {
            return (
                <button className="btn btn-gray w-full no-animation btn-animation" onClick={onClick}>
                    변경하기
                </button>
            );
        }

        if (plan.priority == currentSubscription.scordiPlan.priority) {
            return (
                <button className="btn btn-scordi w-full no-animation btn-animation" onClick={onClick}>
                    변경하기
                </button>
            );
        }
    }

    return (
        <button className="btn btn-scordi-500 w-full no-animation btn-animation" onClick={onClick}>
            구독하기
        </button>
    );
});
ScordiPlanCardButton.displayName = 'ScordiPlanCardButton';
