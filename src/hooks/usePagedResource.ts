import {atom, RecoilState, SetterOrUpdater, useRecoilState, useRecoilValue} from 'recoil';
import {AxiosResponse} from 'axios';
import {Paginated} from '^types/utils/paginated.dto';
import {orgIdParamState} from '^atoms/common';

export interface UsePagedResourceOption<DTO, Query> {
    resultAtom: RecoilState<Paginated<DTO>>;
    queryAtom: RecoilState<Query>;
    endpoint: (params: Query) => Promise<AxiosResponse<Paginated<DTO>>>;
    buildQuery?: (params: Query) => Query;
    mergeMode?: boolean;
    getId: (dto: DTO) => any;
}

/**
 * usePagedResource
 * 매번 검색하는 훅을 일일이 만드는게 귀찮아서 만듦.
 * 반복해서 구현하는 스펙을 모아서 한 번에 구현.
 */
export function usePagedResource<DTO, Query>(option: UsePagedResourceOption<DTO, Query>) {
    const {resultAtom, queryAtom, endpoint, buildQuery = (q) => q, mergeMode: defaultMergeMode = false, getId} = option;

    const orgId = useRecoilValue(orgIdParamState);
    const [result, setResult] = useRecoilState(resultAtom);
    const [query, setQuery] = useRecoilState(queryAtom);

    async function search(params: Query, mergeMode = defaultMergeMode, force = false) {
        // if (!orgId || isNaN(orgId)) return;
        params = buildQuery(params);
        const request = () => endpoint(params);
        return cachePagedQuery(setResult, setQuery, params, request, mergeMode, force);
    }

    const reload = () => search({...query}, false, true);
    const movePage = (page: number, append = false) => search({...query, page}, append);
    const resetPage = () => search({...query, page: 1}, false, true);
    const append = makeAppendPagedItemFn(setResult);
    const except = makeExceptPagedItemFn(setResult, (it, item) => getId(it) !== getId(item));

    return {query, result, search, reload, movePage, resetPage, except};
}

interface UsePagedResourceFactoryOption<DTO, Query>
    extends Pick<UsePagedResourceOption<DTO, Query>, 'buildQuery' | 'mergeMode' | 'getId'> {
    key: string;
}

/**
 * 검색하는 훅을 매번 만드는것도 귀찮은데,
 * 관련된 아톰 상태도 두개씩 매번 만드는것도 역시 귀찮아서 만듦.
 * 이 함수는 쉽게 말하면,
 * 아톰을 생성해서 usePagedResource 에 넣어서 훅을 만드는 팩토리 역할이다.
 */
export function buildPagedResource<DTO, Query extends object>(
    endpoint: (params?: Query | undefined) => Promise<AxiosResponse<Paginated<DTO>, any>>,
    option: UsePagedResourceFactoryOption<DTO, Query>,
) {
    const {key, buildQuery, mergeMode, getId} = option;

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

    return () =>
        usePagedResource({
            resultAtom,
            queryAtom,
            endpoint,
            buildQuery,
            mergeMode,
            getId,
        });
}

export function cachePagedQuery<T, Q extends any>(
    setResult: SetterOrUpdater<Paginated<T>>,
    setQuery: SetterOrUpdater<Q>,
    params: Q,
    request: () => Promise<AxiosResponse<Paginated<T>>>,
    mergeMode: boolean,
    force: boolean,
) {
    return new Promise<Paginated<T>>((resolve, reject) => {
        setQuery((oldQuery) => {
            if (!force && JSON.stringify(oldQuery) === JSON.stringify(params)) return oldQuery;

            const req = request().then((res) => res.data);
            req.then((data) => {
                if (mergeMode) {
                    setResult((oldResult) => {
                        const items = [...oldResult.items, ...data.items];
                        const pagination = data.pagination;
                        pagination.currentItemCount = items.length;
                        const merged = {items, pagination};
                        resolve(merged);
                        return merged;
                    });
                } else {
                    resolve(data);
                    setResult(data);
                }
            });

            return params;
        });
    });
}

export function makeAppendPagedItemFn<T>(setResult: SetterOrUpdater<Paginated<T>>) {
    return (list: T[]) => {
        setResult((oldResult) => {
            const items = [...list, ...oldResult.items];
            const pagination = {...oldResult.pagination};
            const diff = list.length;
            pagination.currentItemCount += diff;
            pagination.totalItemCount += diff;
            return {items, pagination};
        });
    };
}

export function makeExceptPagedItemFn<T>(
    setResult: SetterOrUpdater<Paginated<T>>,
    filterFn: (it: T, item: T) => boolean,
) {
    return (item: T) => {
        setResult((oldResult) => {
            const items = oldResult.items.filter((it) => filterFn(it, item));
            const pagination = {...oldResult.pagination};
            const diff = oldResult.pagination.currentItemCount - items.length;
            pagination.currentItemCount -= diff;
            pagination.totalItemCount -= diff;
            return {items, pagination};
        });
    };
}
