import {confirm2} from '^components/util/dialog';
import {LinkTo} from '^components/util/LinkTo';
import {ChannelTalk_Url} from '^config/constants';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {scordiSubscriptionScheduledListAtom as scheduledListAtom} from '^models/_scordi/ScordiSubscription/atom';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {yyyy_mm_dd} from '^utils/dateTime';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {toast} from 'react-hot-toast';
import {useRecoilValue} from 'recoil';

interface ScordiPlanCardButtonProps {
    plan: ScordiPlanDto;
    onClick?: () => any;
}

export const ScordiPlanCardButton = memo((props: ScordiPlanCardButtonProps) => {
    const {plan, onClick} = props;
    const {t} = useTranslation('workspaceSettings');
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
                    <span className="text-12 text-scordi">
                        {startAt} {t('planCard.from')}
                    </span>
                </p>
                <button
                    onClick={() =>
                        confirm2(t('planCard.cancelScheduledPlan') || '').then((res) => {
                            if (res.isConfirmed) {
                                // scordiSubscriptionApi
                                toast.success(t('planCard.scheduledPlanCancelled') || '');
                            }
                        })
                    }
                    className="btn bg-scordi-50 text-scordi w-full no-animation btn-animation hover:bg-red-200 hover:text-red-600 border-none group"
                >
                    <span className="block group-hover:hidden">{t('planCard.nextPlan')}</span>
                    <span className="hidden group-hover:block">{t('planCard.cancel')}</span>
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
                {t('planCard.currentPlan')}
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
                {t('planCard.consultation')}
            </LinkTo>
        );
    }

    if (currentSubscription) {
        if (plan.priority < currentSubscription.scordiPlan.priority) {
            return (
                <button className="btn btn-gray w-full no-animation btn-animation" onClick={onClick}>
                    {t('planCard.changePlan')}
                </button>
            );
        }

        if (plan.priority == currentSubscription.scordiPlan.priority) {
            return (
                <button className="btn btn-scordi w-full no-animation btn-animation" onClick={onClick}>
                    {t('planCard.changePlan')}
                </button>
            );
        }
    }

    return (
        <button className="btn btn-scordi-500 w-full no-animation btn-animation" onClick={onClick}>
            {t('planCard.subscribe')}
        </button>
    );
});
ScordiPlanCardButton.displayName = 'ScordiPlanCardButton';
