import React, {memo} from 'react';
import {floatToPercent} from '^utils/number';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {scordiPlanDescriptionList} from '^models/_scordi/ScordiPlan/components/descriptionList';
import {ScordiPlanCardHeaderPrice} from './ScordiPlanCardHeaderPrice';
import {ScordiPlanCardButton} from './ScordiPlanCardButton';
import {selectDisplayPlanAtTier} from './selectDisplayPlanAtTier';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';

interface ScordiPlanCardProps {
    scordiPlan: ScordiPlanDto;
    onClick: () => any;
}

export const ScordiPlanCard = memo((props: ScordiPlanCardProps) => {
    const {scordiPlan, onClick} = props;
    const {currentSubscription} = useCurrentScordiSubscription();
    const {plan, isCurrent} = selectDisplayPlanAtTier(scordiPlan, currentSubscription);

    const descriptions = scordiPlanDescriptionList[plan.priority - 1];

    return (
        <div
            className={`flex-1 flex flex-col border rounded-xl p-4 hover:border-scordi transition cursor-pointer ${
                isCurrent ? 'border-scordi' : ''
            }`}
        >
            <div className={'flex-1 space-y-4 flex flex-col'} onClick={isCurrent ? undefined : onClick}>
                <div className="min-h-[7rem] flex flex-col justify-between border-b pb-4">
                    <div className="flex justify-between items-start">
                        <div>{plan.name}</div>

                        {plan.price < plan.regularPrice && (
                            <div className={'btn btn-outline btn-xs btn-scordi-500'}>
                                {floatToPercent(plan.discountRatio, 0)}% OFF
                            </div>
                        )}
                    </div>
                    <div className={'font-bold text-xl'}>
                        <ScordiPlanCardHeaderPrice plan={plan} />
                    </div>
                </div>

                <div className="flex flex-col justify-between flex-grow">
                    <div className="space-y-2 flex-grow mb-8">
                        {descriptions.map((desc, i) => (
                            <div key={i} className={'flex items-center space-x-2 text-sm'}>
                                {desc}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <ScordiPlanCardButton plan={plan} onClick={isCurrent ? undefined : onClick} />
            </div>
        </div>
    );
});
ScordiPlanCard.displayName = 'ScordiPlanCard';
