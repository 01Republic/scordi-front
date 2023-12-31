import {AxiosResponse} from 'axios';
import {Paginated} from '^types/utils/paginated.dto';
import {atom} from 'recoil';
import {usePagedResource} from './usePagedResouce';

interface UsePagedResourceFactoryOption<DTO, Query> {
    endpoint: (params?: Query | undefined) => Promise<AxiosResponse<Paginated<DTO>, any>>;
    key: string;
    buildQuery: (params: Query) => Query;
    getId: (dto: DTO) => any;
    mergeMode?: boolean;
}

/**
 * 검색하는 훅을 매번 만드는것도 귀찮은데,
 * 관련된 아톰 상태도 두개씩 매번 만드는것도 역시 귀찮아서 만듦.
 * 이 함수는 쉽게 말하면,
 * 아톰을 생성해서 usePagedResource 에 넣어서 훅을 만드는 팩토리 역할이다.
 */
export function buildPagedResource<DTO, Query extends object>(option: UsePagedResourceFactoryOption<DTO, Query>) {
    const {endpoint, key, buildQuery, mergeMode, getId} = option;

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
        // @ts-ignore
        default: {},
    });

    return () => {
        return usePagedResource({
            resultAtom,
            queryAtom,
            endpoint,
            buildQuery,
            mergeMode,
            getId,
        });
    };
}
