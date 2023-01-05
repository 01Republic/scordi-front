import {useCallback, useEffect, useState} from 'react';
import {Paginated} from '^types/utils/paginated.dto';
import {AxiosResponse} from 'axios';
import {errorNotify} from '^utils/toast-notify';

function hasInvalidValue<T extends object>(object: T): boolean {
    return Object.values(object).every((v) =>
        v && typeof v === 'object' ? hasInvalidValue(v) : isNaN(v) || v === null || typeof v === 'undefined',
    );
}

/**
 * 범용 리소스에 대응할 수 있게 제작된 페이지네이션 목록 조회용 훅 빌더입니다.
 * Recoil 의 atom 함수와 사용방법이 유사합니다.
 * 주된 기능은, 파라미터가 정확히 동일한 요청은 요청을 중복전송 하는 대신 캐시에서 꺼내오게 하는 것 입니다.
 * 그리고 2페이지, 3페이지 와 같이 데이터를 재요청 해야 할 때 Recoil 보다 직관적인 방법을 지원합니다.
 *
 * Recoil 에 대한 이해가 깊어진다면 대체할 수 있을 것 같습니다.
 * 그러나 Recoil 을 공부하기에는 시간이 부족하고,
 * 문제를 무시하기에는 한 페이지에서 너무 많은 중복 요청을 보냅니다.
 *
 * 예를 들어, 결제내역 조회 페이지에서는 아무리 상태 최적화를 해도
 * 페이지 오픈시 똑같은 요청이 9번 전송하고 있었습니다.
 *
 * ---
 * Usage:
 *
 *      export const useBillingHistories = makeFindAllResources<BillingHistoryDto, GetBillingHistoriesParams>({
 *          key: 'getBillingHistories',
 *          default: [],
 *          fetcher: getBillingHistories,
 *      });
 *
 * ---
 * 다음은 단일 리소스에 대한 훅 코드의 원형으로,
 * 범용 리소스로 확장하기 위해 베이스가 되었선 코드입니다.
 * 목록 조회 할 때마다 아래 코드를 매번 반복해서 작성하기에
 * 꽤 길고 번거로우며 관리하고 있어야 할 상태도 많아서 빌더를 만들었습니다.
 *
 * // let GetBillingHistoriesCachedQuery = '';
 * // let GetBillingHistoriesCachedData = [] as BillingHistoryDto[];
 * //
 * // export const useBillingHistories = (
 * //     params: GetBillingHistoriesParams,
 * //     validator?: (params: GetBillingHistoriesParams) => boolean,
 * // ) => {
 * //     const [page, setPage] = useState<number>(0);
 * //     const [totalPage, setTotalPage] = useState<number>(0);
 * //     const [totalItemCount, setTotalItemCount] = useState<number>(0);
 * //     const [isLoading, setIsLoading] = useState<boolean>(false);
 * //     const [list, setList] = useState<BillingHistoryDto[]>([]);
 * //     const fetch = useCallback(
 * //         (params: GetBillingHistoriesParams) => {
 * //             // [skip] 요청의 실행조건이 별도로 지정되어 있고, 평가된 값이 거짓이라면 요청을 생략합니다.
 * //             if (validator && !validator(params)) {
 * //                 // console.log('filtered', 'validator', params);
 * //                 return;
 * //             }
 * //
 * //             // [skip] 쿼리가 기존의 요청과 동일하면 요청을 생략하고, 저장된 값을 리턴합니다.
 * //             if (GetBillingHistoriesCachedQuery && GetBillingHistoriesCachedQuery === JSON.stringify(params)) {
 * //                 // console.log('filtered', 'query cache');
 * //                 setList(GetBillingHistoriesCachedData);
 * //                 return;
 * //             } else {
 * //                 GetBillingHistoriesCachedQuery = JSON.stringify(params);
 * //             }
 * //
 * //             console.log(params);
 * //             setIsLoading(true);
 * //             getBillingHistories(params)
 * //                 .then(({data}) => {
 * //                     setPage(data.pagination.currentPage);
 * //                     setTotalPage(data.pagination.totalPage);
 * //                     setTotalItemCount(data.pagination.totalItemCount);
 * //                     const items = [...list, ...data.items];
 * //                     GetBillingHistoriesCachedData = items;
 * //                     setList(items);
 * //                 })
 * //                 .catch(errorNotify)
 * //                 .finally(() => setIsLoading(false));
 * //         },
 * //         [params],
 * //     );
 * //
 * //     useEffect(() => {
 * //         fetch(params);
 * //     }, [params]);
 * //
 * //     return {
 * //         data: list,
 * //         fetch,
 * //         isLoading,
 * //         pagination: {
 * //             currentPage: page,
 * //             totalPage,
 * //             totalItemCount,
 * //         },
 * //     };
 * // };
 */

interface UseFindAllResourcesOption<Entity, Params> {
    key: string;
    default: Entity[];
    fetcher: (params: Params) => Promise<AxiosResponse<Paginated<Entity>, any>>;
}

export function makeFindAllResources<Entity, Params extends object>(option: UseFindAllResourcesOption<Entity, Params>) {
    const CacheStore = {
        query: option.key,
        data: option.default,
    };
    const getResources = option.fetcher;

    return (params: Params, validator?: (params: Params) => boolean) => {
        const [page, setPage] = useState<number>(0);
        const [totalPage, setTotalPage] = useState<number>(0);
        const [totalItemCount, setTotalItemCount] = useState<number>(0);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [list, setList] = useState<Entity[]>([]);

        const fetch = useCallback(
            (params: Params) => {
                // [skip] 파라미터에 NaN 이나 undefined 와 같은 값이 있다면, 정적으로 그냥 거른다.
                if (hasInvalidValue(params)) {
                    // console.log('filtered', 'validator', params);
                    return;
                }

                // [skip] 요청의 실행조건이 별도로 지정되어 있고, 평가된 값이 거짓이라면 요청을 생략합니다.
                if (validator && !validator(params)) {
                    // console.log('filtered', 'validator', params);
                    return;
                }

                // [skip] 쿼리가 기존의 요청과 동일하면 요청을 생략하고, 저장된 값을 리턴합니다.
                if (CacheStore.query && CacheStore.query === `${option.key}/${JSON.stringify(params)}`) {
                    setList(CacheStore.data);
                    return;
                }

                console.log(params);
                setIsLoading(true);
                getResources(params)
                    .then(({data}) => {
                        setPage(data.pagination.currentPage);
                        setTotalPage(data.pagination.totalPage);
                        setTotalItemCount(data.pagination.totalItemCount);
                        const items = [...list, ...data.items];
                        CacheStore.query = `${option.key}/${JSON.stringify(params)}`;
                        CacheStore.data = items;
                        setList(items);
                    })
                    .catch(errorNotify)
                    .finally(() => setIsLoading(false));
            },
            [params],
        );

        useEffect(() => {
            fetch(params);
        }, [params]);

        return {
            data: list,
            fetch,
            isLoading,
            pagination: {
                currentPage: page,
                totalPage,
                totalItemCount,
            },
        };
    };
}
