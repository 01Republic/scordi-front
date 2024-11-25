import {memo} from 'react';
import {ReactNodeElement} from '^types/global.type';
import {ScordiPlanDto, t_planStepType} from '^models/_scordi/ScordiPlan/type';

interface PriceTextWithStepSizeProps {
    text: ReactNodeElement;
    plan: ScordiPlanDto;
}

export const PriceTextWithStepSize = memo((props: PriceTextWithStepSizeProps) => {
    const {text, plan} = props;

    return (
        <>
            {text}
            {plan.stepSize > 0 && <> / {plan.stepSize === 1 ? t_planStepType(plan.stepType) : plan.getStepText()}</>}
        </>
    );
});
PriceTextWithStepSize.displayName = 'PriceTextWithStepSize';
