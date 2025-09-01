import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {SubscriptionDto} from '^models/Subscription/types';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {FindAllBillingHistoriesQueryDto} from '^models/BillingHistory/type';
import {usePaginateUtils} from '^hooks/usePagedResource';
import {APP_BILLING_HISTORY_HOOK_KEY} from '^models/BillingHistory/hook/key';

/** 구독상세 페이지 전용 훅 / 구독에 연결된 결제내역 조회 */
export const useBillingHistoriesOfSubscription = (
    subscription: SubscriptionDto | null,
    params: FindAllBillingHistoriesQueryDto,
) => {
    const {id, organizationId: orgId} = subscription || {};
    const [query, setQuery] = useState(params);

    const queryResult = useQuery({
        queryKey: [APP_BILLING_HISTORY_HOOK_KEY.useSubscriptionAppBillingHistory, orgId, id, query],
        queryFn: async () => {
            return appBillingHistoryApi.index(id!, query).then((res) => res.data);
        },
        initialData: Paginated.init(),
        enabled: !!orgId && !!id,
        // refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    return usePaginateUtils({query, setQuery, queryResult});
};
