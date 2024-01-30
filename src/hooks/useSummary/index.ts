import {atom, RecoilState} from 'recoil';

export interface SummaryAtom<DTO> {
    resultAtom: RecoilState<DTO>;
    isLoadingAtom: RecoilState<boolean>;
}

export function summaryAtom<DTO>(key: string): SummaryAtom<DTO> {
    const resultAtom = atom<DTO>({
        key: `subscriptionSummaryAtom/resultAtom/${key}`,
        default: {} as DTO,
    });

    const isLoadingAtom = atom<boolean>({
        key: `subscriptionSummaryAtom/isLoadingAtom/${key}`,
        default: false,
    });

    return {resultAtom, isLoadingAtom};
}
