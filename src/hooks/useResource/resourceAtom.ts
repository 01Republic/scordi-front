import {atom, RecoilState} from 'recoil';

interface ResourceAtomOption<DTO> {
    // 생상할 아톰의 키가 됩니다.
    key: string;
}

export interface ResourceAtoms<DTO> {
    resultAtom: RecoilState<DTO>;
    resourceIdAtom: RecoilState<number>;
    isLoadingAtom: RecoilState<boolean>;
}

export function resourceAtom<DTO>(option: ResourceAtomOption<DTO>): ResourceAtoms<DTO> {
    const {key} = option;

    const resultAtom = atom<DTO>({
        key: `Resource/resultAtom/${key}`,
        default: {} as DTO,
    });

    const resourceIdAtom = atom<number>({
        key: `Resource/resourceIdAtom/${key}`,
        default: 0,
    });

    const isLoadingAtom = atom<boolean>({
        key: `Resource/isLoadingAtom/${key}`,
        default: false,
    });

    return {resultAtom, resourceIdAtom, isLoadingAtom};
}
