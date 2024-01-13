import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {AxiosResponse} from 'axios';
import {orgIdParamState} from '^atoms/common';
import {cachePagedQuery} from './cachePagedQuery';
import {makeAppendPagedItemFn} from './makeAppendPagedItemFn';
import {makeExceptPagedItemFn} from './makeExceptPagedItemFn';
import {useState} from 'react';
import {PagedResourceAtoms} from '^hooks/usePagedResource/pagedResourceAtom';

export interface UsePagedResourceOption<DTO, Query> {
    endpoint: (params: Query, orgId: number) => Promise<AxiosResponse<Paginated<DTO>>>;
    buildQuery?: (params: Query, orgId: number) => Query;
    mergeMode?: boolean;
    getId: keyof DTO | ((dto: DTO) => any);
    useOrgId?: boolean;
}

/**
 * usePagedResource
 * 매번 검색하는 훅을 일일이 만드는게 귀찮아서 만듦.
 * 반복해서 구현하는 스펙을 모아서 한 번에 구현.
 */
export function usePagedResource<DTO, Query>(
    atoms: PagedResourceAtoms<DTO, Query>,
    option: UsePagedResourceOption<DTO, Query>,
) {
    const {resultAtom, queryAtom} = atoms;
    const {endpoint, buildQuery = (q) => q, mergeMode: defaultMergeMode = false, getId, useOrgId = true} = option;

    const orgId = useRecoilValue(orgIdParamState);
    const [result, setResult] = useRecoilState(resultAtom);
    const [query, setQuery] = useRecoilState(queryAtom);
    const [isLoading, setIsLoading] = useState(false);

    const keyOf = ensureKeyOfIsFunction(getId);

    async function search(params: Query, mergeMode = defaultMergeMode, force = false) {
        if (useOrgId) {
            if (!orgId || isNaN(orgId)) return;
        }
        params = buildQuery(params, orgId);
        const request = () => {
            setIsLoading(true);
            return endpoint(params, orgId).finally(() => {
                setTimeout(() => setIsLoading(false), 200);
            });
        };
        return cachePagedQuery(setResult, setQuery, params, request, mergeMode, force);
    }

    const reload = () => search({...query}, false, true);
    const movePage = (page: number, append = false) => search({...query, page}, append);
    const resetPage = () => search({...query, page: 1}, false, true);
    const append = makeAppendPagedItemFn(setResult);
    const except = makeExceptPagedItemFn(setResult, (it, item) => keyOf(it) !== keyOf(item));
    // @ts-ignore
    const clearCache = () => setQuery({});

    return {query, result, search, reload, movePage, resetPage, except, isLoading, clearCache};
}

// getId 파라미터에 콜백함수가 아닌 문자열 리터럴을 입력받는 경우, 콜백으로 변환합니다.
function ensureKeyOfIsFunction<DTO>(finder: keyof DTO | ((dto: DTO) => any)) {
    return typeof finder == 'function' ? finder : (dto: DTO) => dto[finder];
}
