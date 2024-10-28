import {useRecoilState} from 'recoil';
import {FindAllScordiPlanQueryDto, ScordiPlanStepType} from '^models/_scordi/ScordiPlan/type';
import {scordiPlanApi} from '^models/_scordi/ScordiPlan/api';
import {dPayPlansAtom, dPayPlansCurrentStepTypeAtom, dPayPlansIsLoadingAtom, dPayPlansQueryAtom} from './atom';

export const useDPayPlanList = () => {
    const [isLoading, setIsLoading] = useRecoilState(dPayPlansIsLoadingAtom);
    const [plans, setPlans] = useRecoilState(dPayPlansAtom);
    const [query, setQuery] = useRecoilState(dPayPlansQueryAtom);
    const [currentStepType, setStepType] = useRecoilState(dPayPlansCurrentStepTypeAtom);

    const fetch = (params: FindAllScordiPlanQueryDto = {}, force = false) => {
        if (!force && JSON.stringify(params) === JSON.stringify(query)) return;

        setStepType((oldType) => {
            const newType = params?.where?.stepType as ScordiPlanStepType | undefined;
            return newType || oldType;
        });

        setIsLoading(true);
        scordiPlanApi
            .index(params)
            .then((res) => setPlans(res.data))
            .then(() => setQuery(params))
            .finally(() => setIsLoading(false));
    };

    const reload = () => {
        fetch(query, true);
    };

    const switchStepType = (stepType: ScordiPlanStepType) => {
        const params = {...query};
        params.where = {...(query.where || {})};
        params.where.stepType = stepType;
        fetch(params);
    };

    return {
        isLoading,
        plans,
        fetch,
        reload,
        currentStepType,
        switchStepType,
    };
};
