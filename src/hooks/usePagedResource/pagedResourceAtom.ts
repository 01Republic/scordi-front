import {atom, RecoilState} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';

interface PagedResourceAtomOption<DTO, Query> {
    // 생상할 아톰의 키가 됩니다.
    key: string;
}

export interface PagedResourceAtoms<DTO, Query> {
    resultAtom: RecoilState<Paginated<DTO>>;
    queryAtom: RecoilState<Query>;
    isLoadingAtom: RecoilState<boolean>;
    isNotLoadedAtom: RecoilState<boolean>;
}

export function pagedResourceAtom<DTO, Query>(
    option: PagedResourceAtomOption<DTO, Query>,
): PagedResourceAtoms<DTO, Query> {
    const {key} = option;

    const resultAtom = atom<Paginated<DTO>>({
        key: `PagedResource/resultAtom/${key}`,
        default: {
            items: [],
            pagination: {
                totalItemCount: 0,
                currentItemCount: 0,
                totalPage: 1,
                currentPage: 1,
                itemsPerPage: 30,
            },
        },
    });

    const queryAtom = atom<Query>({
        key: `PagedResource/queryAtom/${key}`,
        default: {} as Query,
    });

    const isLoadingAtom = atom<boolean>({
        key: `PagedResource/isLoadingAtom/${key}`,
        default: false,
    });

    const isNotLoadedAtom = atom<boolean>({
        key: `PagedResource/isNotLoadedAtom/${key}`,
        default: true,
    });

    return {resultAtom, queryAtom, isLoadingAtom, isNotLoadedAtom};
}
