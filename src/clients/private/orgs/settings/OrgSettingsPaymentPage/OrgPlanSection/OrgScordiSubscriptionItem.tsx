import React, {memo} from 'react';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {t_planStepType} from '^models/_scordi/ScordiPlan/type';
import {OrgScordiSubscriptionItemExpireNote} from './OrgScordiSubscriptionItemExpireNote';
import {OrgScordiSubscriptionItemDropdown} from './OrgScordiSubscriptionItemDropdown';

interface OrgScordiSubscriptionItemProps {
    scordiSubscription: ScordiSubscriptionDto;
}

export const OrgScordiSubscriptionItem = memo((props: OrgScordiSubscriptionItemProps) => {
    const {scordiSubscription} = props;

    return (
        <div className={'p-4 bg-slate-50 flex items-center justify-between rounded-lg text-14'}>
            <div className="flex items-center gap-2">
                <div className="font-semibold" onClick={() => console.log(scordiSubscription)}>
                    {scordiSubscription.scordiPlan.name}
                </div>
                <div className="font-semibold text-gray-500">
                    {scordiSubscription.scordiPlan.price === 0 ? (
                        <span>(무료{scordiSubscription.scordiPlan.regularPrice > 0 ? ' (할인됨)' : ''})</span>
                    ) : (
                        <span>
                            ({t_planStepType(scordiSubscription.scordiPlan.stepType)} 정기구독 /{' '}
                            {scordiSubscription.scordiPlan.price.toLocaleString()}원)
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <OrgScordiSubscriptionItemExpireNote scordiSubscription={scordiSubscription} />

                {scordiSubscription.nextSubscriptionId && (
                    <div>
                        <OrgScordiSubscriptionItemDropdown scordiSubscription={scordiSubscription} />
                    </div>
                )}

                {/*{scordiSubscription.startAt && scordiSubscription.finishAt ? (*/}
                {/*    <div className="flex items-center gap-1.5">*/}
                {/*        <span className="text-gray-500">이용기간 :</span>*/}
                {/*        <span>*/}
                {/*            {yyyy_mm_dd(scordiSubscription.startAt, '. ')} ~{' '}*/}
                {/*            {yyyy_mm_dd(scordiSubscription.finishAt, '. ')}*/}
                {/*        </span>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    ''*/}
                {/*)}*/}
            </div>
        </div>
    );
});
OrgScordiSubscriptionItem.displayName = 'OrgScordiSubscriptionItem';
