import React, {memo} from 'react';
import {ScordiPlanDto, t_planStepType} from '^models/_scordi/ScordiPlan/type';

interface ScordiPlanCardHeaderPriceProps {
    plan: ScordiPlanDto;
}

export const ScordiPlanCardHeaderPrice = memo((props: ScordiPlanCardHeaderPriceProps) => {
    const {plan} = props;

    if (plan.isCustomInquired) return <>도입 문의</>;
    if (plan.regularPrice === 0 && plan.price === 0) return <>무료</>;

    return (
        <div>
            <span className={'text-sm text-gray-300 font-medium line-through'}>
                {plan.regularPrice.toLocaleString()}
            </span>
            <br />
            {plan.price === 0 ? (
                <>무료</>
            ) : (
                <span>
                    {plan.price.toLocaleString()}
                    <span className={'text-sm text-gray-500 font-medium'}>/{plan.getStepText()}</span>
                </span>
            )}
        </div>
    );
});
ScordiPlanCardHeaderPrice.displayName = 'ScordiPlanCardHeader';
