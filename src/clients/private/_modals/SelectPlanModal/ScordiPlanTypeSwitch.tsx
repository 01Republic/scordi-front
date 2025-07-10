import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {useScordiPlanList} from '^models/_scordi/ScordiPlan/hook';
import {ScordiPlanStepType} from '^models/_scordi/ScordiPlan/type';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

export const ScordiPlanTypeSwitch = memo(() => {
    const {t} = useTranslation('workspaceSettings');
    const {currentStepType, switchStepType} = useScordiPlanList();

    return (
        <div className="w-32 flex items-center">
            <ButtonGroupRadio
                className=""
                buttonClass="btn btn-sm !text-14"
                onChange={(option) => {
                    switchStepType(option.value);
                }}
                defaultValue={currentStepType}
                options={[
                    {label: t('planCard.stepType.month') || '월간', value: ScordiPlanStepType.Month},
                    {label: t('planCard.stepType.year') || '연간', value: ScordiPlanStepType.Year},
                ]}
            />
        </div>
    );
});
ScordiPlanTypeSwitch.displayName = 'ScordiPlanTypeSwitch';
