import {useRecoilState} from 'recoil';
import {
    scordiPlanCurrentStepTypeAtom,
    scordiPlanListAtom,
    scordiPlanListIsLoadingAtom,
    scordiPlanListQueryAtom,
} from './atom';
import {scordiPlanApi} from './api';
import {FindAllScordiPlanQueryDto, ScordiPlanStepType} from './type';

export const useScordiPlanList = () => {
    const [isLoading, setIsLoading] = useRecoilState(scordiPlanListIsLoadingAtom);
    const [scordiPlanList, setScordiPlanList] = useRecoilState(scordiPlanListAtom);
    const [query, setQuery] = useRecoilState(scordiPlanListQueryAtom);
    const [currentStepType, setStepType] = useRecoilState(scordiPlanCurrentStepTypeAtom);

    const fetch = async (params: FindAllScordiPlanQueryDto = {}, force = false) => {
        if (!force && JSON.stringify(params) === JSON.stringify(query)) return scordiPlanList;

        setStepType((oldType) => {
            const newType = params?.where?.stepType as ScordiPlanStepType | undefined;
            return newType || oldType;
        });

        setIsLoading(true);
        return scordiPlanApi
            .index(params)
            .then((res) => {
                setScordiPlanList(res.data);
                return res.data;
            })
            .then((result) => {
                setQuery(params);
                return result;
            })
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
        scordiPlanList,
        fetch,
        reload,
        currentStepType,
        switchStepType,
    };
};
