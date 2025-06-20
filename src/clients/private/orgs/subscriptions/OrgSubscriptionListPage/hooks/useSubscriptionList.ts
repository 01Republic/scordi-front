import {useOrgIdParam} from '^atoms/common';
import {FindAllSubscriptionsQuery} from '^models/Subscription/types';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {subscriptionApi} from '^models/Subscription/api';
import {Paginated} from '^types/utils/paginated.dto';
import {usePaginateUtils} from '^hooks/usePagedResource';

/** 구독목록 페이지 전용 훅 / 구독 목록 조회 */
export const useSubscriptionList = (params: FindAllSubscriptionsQuery) => {
    const orgId = useOrgIdParam();
    const [query, setQuery] = useState(params);

    const queryResult = useQuery({
        queryKey: ['subscriptionList', orgId, query],
        queryFn: async () => {
            query.where = {organizationId: orgId, ...query.where};
            return subscriptionApi.index(query).then((res) => res.data);
        },
        initialData: Paginated.init(),
        enabled: !!orgId && !isNaN(orgId),
        // refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    return usePaginateUtils({query, setQuery, queryResult});
};
