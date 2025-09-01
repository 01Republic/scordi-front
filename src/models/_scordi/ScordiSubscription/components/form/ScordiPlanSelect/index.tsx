import {forwardRef, memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {ScordiPlanDto, ScordiPlanNextStrategy} from '^models/_scordi/ScordiPlan/type';
import {FormControl} from '../FormControl';
import {ResourceColumn} from '^admin/share';
import {ChevronDown} from 'lucide-react';
import {ResourceSelectControl} from '^models/_scordi/ScordiSubscription/components/form/ResourceSelectControl';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';

interface ScordiPlanSelectProps {
    scordiSubscription?: ScordiSubscriptionDto;
    readOnly?: boolean;
}

export const ScordiPlanSelect = (props: ScordiPlanSelectProps) => {
    const {scordiSubscription, readOnly = false} = props;
    const form = useFormContext<{scordiPlanId?: number}>();
    const [plan, setSelectedPlan] = useState(scordiSubscription?.scordiPlan);

    return (
        <FormControl label="플랜" required className="col-span-2">
            <ResourceSelectControl resource={plan} readOnly={readOnly}>
                {({resource: plan}) => (
                    <>
                        <p className="text-13 leading-none mb-0.5">{plan.name}</p>
                        <p className="text-11 leading-none">
                            {plan.getStepText()}{' '}
                            {plan.nextStrategy === ScordiPlanNextStrategy.RECURRING
                                ? '마다 반복결제'
                                : plan.nextStrategy === ScordiPlanNextStrategy.BLOCK
                                ? '한정판'
                                : ''}
                        </p>
                    </>
                )}
            </ResourceSelectControl>
        </FormControl>
    );
};
