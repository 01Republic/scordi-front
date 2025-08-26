import {useOrgIdParam} from '^atoms/common';
import {FindAllSubscriptionsQuery, SubscriptionUsingStatus} from '^models/Subscription/types';
import {useCallback, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {subscriptionApi} from '^models/Subscription/api';
import {Paginated} from '^types/utils/paginated.dto';
import {usePaginateUtils} from '^hooks/usePagedResource';
import {SUBSCRIPTION_HOOK_KEY} from '^models/Subscription/hook/key';
import {FindAllSubscriptionsGroupedByProductDto} from '^models/Subscription/types/find-all.subscriptions-grouped-by-product.query.dto';
import Qs from 'qs';

/** 구독목록 페이지 전용 훅 / 구독 목록 조회 */
export const useSubscriptionList = (isGroupMode: boolean, params: FindAllSubscriptionsQuery) => {
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
        queryFn: () => subscriptionApi.index(query).then((res) => res.data),
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

export const useSubscriptionListGroupedByProduct = (
    isGroupMode: boolean,
    params: FindAllSubscriptionsGroupedByProductDto,
) => {
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
        queryFn: () => subscriptionApi.groupedByProduct(query).then((res) => res.data),
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
