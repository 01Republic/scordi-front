import {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {AxiosResponse} from 'axios';
import Qs from 'qs';
import {useRecoilStates} from '^hooks/useRecoil';
import {PagedResourceAtoms} from '^hooks/usePagedResource/pagedResourceAtom';
import {Paginated} from '^types/utils/paginated.dto';
import {orgIdParamState} from '^atoms/common';
import {cachePagedQuery} from './cachePagedQuery';
import {makeAppendPagedItemFn} from './makeAppendPagedItemFn';
import {makeExceptPagedItemFn} from './makeExceptPagedItemFn';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

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
export function usePagedResource<DTO, Query extends FindAllQueryDto<DTO>>(
    atoms: PagedResourceAtoms<DTO, Query>,
    option: UsePagedResourceOption<DTO, Query>,
) {
    const {resultAtom, queryAtom, isLoadingAtom} = atoms;
    const {endpoint, buildQuery = (q) => q, mergeMode: defaultMergeMode = false, getId, useOrgId = true} = option;

    const orgId = useOrgId ? useRecoilValue(orgIdParamState) : NaN;
    const {value: result, setValue: setResult, resetValue: resetResult} = useRecoilStates(resultAtom);
    const {value: query, setValue: setQuery, resetValue: resetQuery} = useRecoilStates(queryAtom);
    const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
    const [__isLoading, __setIsLoading] = useState(false);

    // recoil 의 정책상 set atom 스코프 내에서 다시 set atom 을 호출하는 것이 불가능합니다.
    // 그래서 request 함수 내에서 isLoading 을 pure react hook 으로 업데이트(__setIsLoading)하고,
    // 다시 그 값(__isLoading)의 변화를 전달 받아 간접적으로 set atom 을 실행합니다.
    useEffect(() => {
        setIsLoading(__isLoading);
    }, [__isLoading]);

    const keyOf = ensureKeyOfIsFunction(getId);

    async function search(params: Query, mergeMode = defaultMergeMode, force = false) {
        if (useOrgId) {
            if (!orgId || isNaN(orgId)) return;
        }
        params = buildQuery(params, orgId);
        const request = () => {
            __setIsLoading(true);
            return endpoint(params, orgId).finally(() => {
                setTimeout(() => __setIsLoading(false), 200);
            });
        };
        return cachePagedQuery(setResult, setQuery, params, request, mergeMode, force);
    }

    async function orderBy(sortKey: string, value: 'ASC' | 'DESC') {
        if (!query) return;
        return search({...query, page: 1, order: Qs.parse(`${sortKey}=${value}`)});
    }

    const reset = () => {
        __setIsLoading(false);
        resetQuery();
        resetResult();
    };
    const reload = () => search({...query}, false, true);
    const movePage = (page: number, append = false) => search({...query, page}, append);
    const resetPage = () => search({...query, page: 1}, false, true);
    const changePageSize = (itemsPerPage: number) => search({...query, page: 1, itemsPerPage}, false, true);
    const append = makeAppendPagedItemFn(setResult);
    const except = makeExceptPagedItemFn(setResult, (it, item) => keyOf(it) !== keyOf(item));
    const clearCache = () => resetQuery();

    return {
        query,
        result,
        search,
        reload,
        reset,
        movePage,
        resetPage,
        changePageSize,
        orderBy,
        except,
        isLoading,
        clearCache,
    };
}

// getId 파라미터에 콜백함수가 아닌 문자열 리터럴을 입력받는 경우, 콜백으로 변환합니다.
function ensureKeyOfIsFunction<DTO>(finder: keyof DTO | ((dto: DTO) => any)) {
    return typeof finder == 'function' ? finder : (dto: DTO) => dto[finder];
}
