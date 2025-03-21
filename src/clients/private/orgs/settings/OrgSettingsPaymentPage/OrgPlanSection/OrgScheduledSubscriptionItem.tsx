import React, {memo} from 'react';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {t_planStepType} from '^models/_scordi/ScordiPlan/type';
import {yyyy_mm_dd} from '^utils/dateTime';

interface OrgScheduledSubscriptionItemProps {
    scordiSubscription: ScordiSubscriptionDto;
}

export const OrgScheduledSubscriptionItem = memo((props: OrgScheduledSubscriptionItemProps) => {
    const {scordiSubscription} = props;

    return (
        <div className={'p-4 bg-slate-50 flex items-center justify-between rounded-lg text-14'}>
            <div className="flex items-center gap-2">
                <div className="font-semibold">{scordiSubscription.scordiPlan.name}</div>
                <div className="font-semibold text-gray-500">
                    {scordiSubscription.scordiPlan.price === 0 ? (
                        <span>(무료{scordiSubscription.scordiPlan.regularPrice > 0 ? ' (할인됨)' : ''})</span>
                    ) : (
                        <span>({t_planStepType(scordiSubscription.scordiPlan.stepType)} 정기구독)</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/*<div className="flex items-center gap-1.5">*/}
                {/*    <span className="text-gray-500">다음 결제일 :</span>*/}
                {/*    <span>*/}
                {/*        {scordiSubscription.getNextDate() ? yyyy_mm_dd(scordiSubscription.getNextDate()!, '. ') : '-'}*/}
                {/*    </span>*/}
                {/*</div>*/}

                {scordiSubscription.startAt && scordiSubscription.finishAt ? (
                    <div className="flex items-center gap-1.5">
                        <span className="text-gray-500">변경 예정일 :</span>
                        <span>{yyyy_mm_dd(scordiSubscription.startAt, '. ')}</span>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
});
OrgScheduledSubscriptionItem.displayName = 'OrgScheduledSubscriptionItem';
