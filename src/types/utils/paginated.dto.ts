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

// For useInfiniteQuery
export function getNextPageParam<T>(lastPage: Paginated<T>) {
    const {currentPage, totalPage} = lastPage.pagination;
    return currentPage == totalPage ? undefined : currentPage + 1;
}

export function getPreviousPageParam<T>(firstPage: Paginated<T>, allPages: Paginated<T>[], firstPageParam: number) {
    return firstPageParam <= 1 ? undefined : firstPageParam - 1;
}

export const infiniteQueryDefaultOptions = {
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam,
    getPreviousPageParam,
};

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
