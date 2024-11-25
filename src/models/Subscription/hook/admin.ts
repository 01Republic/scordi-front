import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {FindAllSubscriptionsQuery, SubscriptionDto} from '^models/Subscription/types';
import {subscriptionApi} from '^models/Subscription/api';
import {subscriptionListOfProductDetailForAdminAtom} from '^models/Subscription/atom';

// 어드민 > 앱 상세 > 구독 리스트
export const useSubscriptionListOfProductDetailForAdmin = () => {
    return useSubscriptionListForAdmin(subscriptionListOfProductDetailForAdminAtom);
};

const useSubscriptionListForAdmin = (
    atoms: PagedResourceAtoms<SubscriptionDto, FindAllSubscriptionsQuery>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: false,
        endpoint: (params) => subscriptionApi.index(params),
        getId: 'id',
        mergeMode,
    });
};
