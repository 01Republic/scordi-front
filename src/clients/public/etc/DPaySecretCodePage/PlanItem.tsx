import React, {memo} from 'react';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';

interface PlanItemProps {
    plan: ScordiPlanDto;
    selected: boolean;
    onClick: (plan: ScordiPlanDto) => any;
}

export const PlanItem = memo((props: PlanItemProps) => {
    const {plan, selected, onClick} = props;

    return (
        <div
            className={`px-4 py-3 border rounded-lg ${
                selected ? 'border-gray-300' : 'border-gray-50'
            } transition hover:border-gray-300 cursor-pointer`}
            onClick={() => onClick(plan)}
        >
            <div className="hidden">
                <input type="radio" className="radio radio-xs radio-primary" checked={selected} onChange={() => 1} />
            </div>
            <div>
                <p className="font-semibold text-right">{plan.name}</p>
                <p className="font-bold text-right text-lg">{plan.price.toLocaleString()}원</p>
            </div>
        </div>
    );
});
PlanItem.displayName = 'PlanItem';
