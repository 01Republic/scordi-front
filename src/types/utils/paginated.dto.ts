import {useMemo} from 'react';
import {UseInfiniteQueryResult} from '@tanstack/react-query';
import {InfiniteData, keepPreviousData} from '@tanstack/query-core';

export class PaginationMetaData {
    totalItemCount: number;
    currentItemCount: number;
    totalPage: number;
    currentPage: number;
    itemsPerPage: number;
}

export class Paginated<DTO> {
    items: DTO[];
    pagination: PaginationMetaData;

    static init<DTO = never>() {
        return {
            items: [] as DTO[],
            pagination: {
                totalItemCount: 0,
                currentItemCount: 0,
                totalPage: 0,
                currentPage: 0,
                itemsPerPage: 0,
            },
        };
    }
}

/**
 * 다음 페이지 번호를 계산합니다.
 *
 * lastPage.pagination의 currentPage와 totalPage를 기준으로 현재 페이지가 마지막이면 `undefined`를,
 * 아니면 다음 페이지 번호(`currentPage + 1`)를 반환합니다.
 *
 * @param lastPage - 마지막으로 로드된 페이지의 페이징 정보와 항목을 포함한 객체
 * @returns 다음 페이지 번호 혹은 더 이상 페이지가 없으면 `undefined`
 */
export function getNextPageParam<T>(lastPage: Paginated<T>) {
    const {currentPage, totalPage} = lastPage.pagination;
    return currentPage == totalPage ? undefined : currentPage + 1;
}

/**
 * useInfiniteQuery에서 이전 페이지 파라미터를 계산합니다.
 *
 * firstPageParam이 1 이하이면 이전 페이지가 없으므로 `undefined`를 반환하고, 그렇지 않으면 `firstPageParam - 1`을 반환합니다.
 *
 * @param firstPage - (사용되지 않음) 함수 시그니처 호환을 위해 전달되는 현재 첫 페이지 데이터
 * @param allPages - (사용되지 않음) 함수 시그니처 호환을 위해 전달되는 모든 페이지 데이터 배열
 * @param firstPageParam - 현재의 첫 페이지 번호 (1부터 시작)
 * @returns 이전 페이지 번호 또는 이전 페이지가 없으면 `undefined`
 */
export function getPreviousPageParam<T>(firstPage: Paginated<T>, allPages: Paginated<T>[], firstPageParam: number) {
    return firstPageParam <= 1 ? undefined : firstPageParam - 1;
}

export const infiniteQueryDefaultOptions = {
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam,
    getPreviousPageParam,
};

/**
 * React Query의 Infinite Query 결과 페이지들을 하나의 Paginated<T>로 병합해 반환합니다.
 *
 * 주어진 useInfiniteQuery 결과의 `data.pages`를 펼쳐 모든 페이지의 `items`를 단일 배열로 합치고,
 * 마지막 페이지의 `pagination` 메타데이터를 병합된 결과의 `pagination`으로 사용합니다.
 * 입력 데이터가 없으면 빈 항목 배열과 0으로 초기화된 페이지네이션을 가진 Paginated<T>를 반환합니다.
 *
 * @param queryResult - useInfiniteQuery에서 반환된 결과 객체. 이 함수는 `queryResult.data?.pages`만 읽습니다.
 * @returns 모든 페이지의 항목을 합치고 마지막 페이지의 페이지네이션을 보존한 Paginated<T>
 */
export function useInfiniteQueryMergeResult<T>(
    queryResult: UseInfiniteQueryResult<InfiniteData<Paginated<T>, unknown>, Error>,
) {
    return useMemo(() => {
        const pages = queryResult.data?.pages || [];
        const lastPage = pages.length ? pages[pages.length - 1] : undefined;
        const paginated = Paginated.init<T>();
        paginated.items = pages.flatMap((page) => page.items);
        if (lastPage) paginated.pagination = lastPage.pagination;
        return paginated;
    }, [queryResult.data]);
}
