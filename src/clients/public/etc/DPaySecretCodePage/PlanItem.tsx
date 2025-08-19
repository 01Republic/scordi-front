import React, {memo} from 'react';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {currencyFormat} from '^utils/number';

interface PlanItemProps {
    plan: ScordiPlanDto;
    selected: boolean;
    onClick: (plan: ScordiPlanDto) => any;
}

export const PlanItem = memo((props: PlanItemProps) => {
    const {plan, selected, onClick} = props;

    return (
        <div
            className={`-mx-2 px-2 sm:mx-0 sm:px-4 py-3 bg-slate-50 sm:bg-transparent sm:border rounded-lg ${
                selected ? 'border-gray-300' : 'border-gray-50'
            } transition hover:border-gray-300 cursor-pointer`}
            onClick={() => onClick(plan)}
        >
            <div className="hidden">
                <input type="radio" className="radio radio-xs radio-primary" checked={selected} onChange={() => 1} />
            </div>
            <div className="flex sm:flex-col justify-between">
                <p className="font-semibold">{plan.name}</p>
                <p className="font-bold sm:text-lg">
                    {plan.regularPrice > plan.price && (
                        <span className="block text-11 text-right font-normal text-gray-500 line-through">
                            {currencyFormat(plan.regularPrice)}
                        </span>
                    )}
                    <span>{currencyFormat(plan.price)}</span>
                </p>
            </div>
        </div>
    );
});
PlanItem.displayName = 'PlanItem';
