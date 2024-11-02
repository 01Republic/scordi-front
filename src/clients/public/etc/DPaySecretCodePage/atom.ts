import {atom} from 'recoil';
import {FindAllScordiPlanQueryDto, ScordiPlanDto, ScordiPlanStepType} from '^models/_scordi/ScordiPlan/type';

export const secretCodeParamsAtom = atom<string>({
    key: 'secretCodeParamsAtom',
    default: '',
});

export const dPayPlansAtom = atom<ScordiPlanDto[]>({
    key: 'dPayPlansAtom',
    default: [],
});

export const dPayPlansIsLoadingAtom = atom({
    key: 'dPayPlansIsLoadingAtom',
    default: false,
});

export const dPayPlansQueryAtom = atom<FindAllScordiPlanQueryDto>({
    key: 'dPayPlansQueryAtom',
    default: {},
});

export const dPayPlansCurrentStepTypeAtom = atom({
    key: 'dPayPlansCurrentStepTypeAtom',
    default: ScordiPlanStepType.Month,
});
