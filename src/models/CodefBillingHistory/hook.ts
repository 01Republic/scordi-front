import {useQuery} from '@tanstack/react-query';
import {PagedResourceAtoms, usePagedResource, usePaginateUtils} from '^hooks/usePagedResource';
import {codefBillingHistoriesAdminApi, codefBillingHistoriesApi} from '^models/CodefBillingHistory/api';
import {CodefBillingHistoryDto, FindAllCodefBillingHistoryAdminQueryDto} from '^models/CodefBillingHistory/type';
import {useState} from 'react';
import {Paginated} from '^types/utils/paginated.dto';

// 코드에프카드 - 가장 오래된 결제내역 단건 조회
export const useOldestCodefBillingHistory = (orgId: number, codefId?: number) => {
    return useQuery({
        queryKey: ['oldest-codef-billing-history', orgId, codefId],
        queryFn: async () => {
            if (!codefId) return;
            return codefBillingHistoriesApi.index(orgId, codefId).then((res) => res.data);
        },
        enabled: !!orgId && !!codefId,
    });
};

export const useAdminCodefBillingHistories = (
    orgId: number | undefined,
    params?: FindAllCodefBillingHistoryAdminQueryDto,
) => {
    const [query, setQuery] = useState(params || {});
    const queryResult = useQuery({
        queryKey: ['admin/useAdminCodefBillingHistories2', orgId, query],
        queryFn: async () => {
            const {...q} = query || {};
            q.organizationId = orgId;
            return codefBillingHistoriesAdminApi.index(q).then((res) => res.data);
        },
        initialData: Paginated.init(),
        enabled: !!orgId && !!Object.keys(query).length,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return usePaginateUtils({query, queryResult, setQuery});
};
