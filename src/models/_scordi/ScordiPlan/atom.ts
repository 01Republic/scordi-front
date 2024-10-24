import {atom} from 'recoil';
import {FindAllScordiPlanQueryDto, ScordiPlanDto, ScordiPlanStepType} from './type';

export const scordiPlanListAtom = atom<ScordiPlanDto[]>({
    key: 'scordiPlanListAtom',
    default: [],
});

export const scordiPlanListIsLoadingAtom = atom({
    key: 'scordiPlanListIsLoadingAtom',
    default: false,
});

export const scordiPlanListQueryAtom = atom<FindAllScordiPlanQueryDto>({
    key: 'scordiPlanListQueryAtom',
    default: {},
});

export const scordiPlanCurrentStepTypeAtom = atom({
    key: 'scordiPlanCurrentStepTypeAtom',
    default: ScordiPlanStepType.Month,
});
