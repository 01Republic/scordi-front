import {useOrgIdParam} from '^atoms/common';
import {FindAllSubscriptionsQuery} from '^models/Subscription/types';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {subscriptionApi} from '^models/Subscription/api';
import {Paginated} from '^types/utils/paginated.dto';
import {usePaginateUtils} from '^hooks/usePagedResource';
import {SUBSCRIPTION_HOOK_KEY} from '^models/Subscription/hook/key';
import {FindAllSubscriptionsGroupedByProductDto} from '^models/Subscription/types/find-all.subscriptions-grouped-by-product.query.dto';
import Qs from 'qs';

/** 구독목록 페이지 전용 훅 / 구독 목록 조회 */
export const useSubscriptionListSingle = (isGroupMode: boolean, params: FindAllSubscriptionsQuery) => {
    const orgId = useOrgIdParam();
    const [query, setQuery] = useState(params);
    const [sortVal, setSortVal] = useState<'ASC' | 'DESC'>('DESC');

    const orderBy = (sortKey: string) => {
        setSortVal((prev) => {
            const next: 'ASC' | 'DESC' = prev === 'ASC' ? 'DESC' : 'ASC';
            setQuery((prevQ) => ({
                ...prevQ,
                page: 1,
                order: Qs.parse(`${sortKey}=${next}`),
            }));
            return next;
        });
    };

    const queryResult = useQuery({
        queryKey: [SUBSCRIPTION_HOOK_KEY.list, orgId, query],
        queryFn: async () => {
            query.where = {organizationId: orgId, ...query.where};
            return subscriptionApi.index(query).then((res) => res.data);
        },
        initialData: Paginated.init(),
        enabled: !!orgId && !isNaN(orgId) && !isGroupMode,
        // refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    return {
        ...usePaginateUtils({query, setQuery, queryResult}),
        sortVal,
        orderBy,
    };
};

export const useSubscriptionListGrouped = (isGroupMode: boolean, params: FindAllSubscriptionsGroupedByProductDto) => {
    const orgId = useOrgIdParam();
    const [query, setQuery] = useState({
        ...params,
        organizationId: orgId,
    });

    const [sortVal, setSortVal] = useState<'ASC' | 'DESC'>('DESC');

    const orderBy = (sortKey: string) => {
        setSortVal((prev) => {
            const next: 'ASC' | 'DESC' = prev === 'ASC' ? 'DESC' : 'ASC';
            setQuery((prevQ) => ({
                ...prevQ,
                page: 1,
                order: Qs.parse(`${sortKey}=${next}`),
            }));
            return next;
        });
    };

    const queryResult = useQuery({
        queryKey: [SUBSCRIPTION_HOOK_KEY.list, orgId, query],
        queryFn: async () => {
            query.where = {...query.where};
            return subscriptionApi.groupedByProduct(query).then((res) => res.data);
        },
        initialData: Paginated.init(),
        enabled: !!orgId && !isNaN(orgId) && isGroupMode,
        // refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    return {
        ...usePaginateUtils({query, setQuery, queryResult}),
        sortVal,
        orderBy,
    };
};

export function useOrgSubscriptionList(
    isGroupMode: boolean,
    singleParams: FindAllSubscriptionsQuery,
    groupParams: FindAllSubscriptionsGroupedByProductDto,
) {
    const single = useSubscriptionListSingle(isGroupMode, singleParams);
    const group = useSubscriptionListGrouped(isGroupMode, groupParams);

    const searchByKeyword = (kw?: string) => {
        const keyword = kw || undefined;
        if (isGroupMode) {
            return group.search({
                ...group.query,
                keyword,
                page: 1,
                itemsPerPage: 30,
            });
        } else {
            return single.search({
                ...single.query,
                keyword,
                page: 1,
                itemsPerPage: 30,
            });
        }
    };

    if (isGroupMode) {
        return {
            mode: 'group',
            result: group.result,
            query: group.query,
            searchByKeyword,
            isLoading: group.isLoading,
            reload: group.reload,
            isNotLoaded: group.isNotLoaded,
            isEmptyResult: group.isEmptyResult,
            movePage: group.movePage,
            changePageSize: group.changePageSize,
            orderBy: group.orderBy,
            sortVal: group.sortVal,
        } as const;
    }

    return {
        mode: 'single',
        result: single.result,
        query: single.query,
        searchByKeyword,
        isLoading: single.isLoading,
        reload: single.reload,
        isNotLoaded: single.isNotLoaded,
        isEmptyResult: single.isEmptyResult,
        movePage: single.movePage,
        changePageSize: single.changePageSize,
        orderBy: single.orderBy,
        sortVal: single.sortVal,
    } as const;
}
