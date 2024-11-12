import {memo} from 'react';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {useScordiPlanList} from '^models/_scordi/ScordiPlan/hook';
import {ScordiPlanStepType} from '^models/_scordi/ScordiPlan/type';

export const ScordiPlanTypeSwitch = memo(() => {
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
                    {label: '월간', value: ScordiPlanStepType.Month},
                    {label: '연간', value: ScordiPlanStepType.Year},
                ]}
            />
        </div>
    );
});
ScordiPlanTypeSwitch.displayName = 'ScordiPlanTypeSwitch';
