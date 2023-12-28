import {FindAllSubscriptionsQuery, SubscriptionDto} from 'src/models/Subscription/types';
import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {
    getSubscriptionQuery,
    getSubscriptionsQuery,
    getCurrentSubscriptionQuery,
    getSubscriptionsQueryAtom,
    subscriptionsSearchResultAtom,
} from '^models/Subscription/atom';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {subscriptionApi} from '^models/Subscription/api';
import {Paginated} from '^types/utils/paginated.dto';
import {cachePagedQuery, makeAppendPagedItemFn, makeExceptPagedItemFn} from '^hooks/usePagedResource';
import {
    dashboardSubscriptionSearchResultAtom,
    getDashboardSubscriptionsQueryAtom,
} from '^v3/V3OrgHomePage/desktop/sections/SubscriptionsSection/atom';

export const useCurrentSubscription = () => {
    const [currentSubscription, reload] = useRecoilState(getCurrentSubscriptionQuery);
    return {currentSubscription, reload: () => reload((v) => v)};
};

export const index = () => useRecoilValue(getSubscriptionsQuery);

export const useSubscriptionsV2 = () => {
    return useSubscriptionsV3(subscriptionsSearchResultAtom, getSubscriptionsQueryAtom);
};

export const useDashboardSubscriptions = () => {
    return useSubscriptionsV3(dashboardSubscriptionSearchResultAtom, getDashboardSubscriptionsQueryAtom);
};

export const useSubscriptionsV3 = (
    resultAtom: RecoilState<Paginated<SubscriptionDto>>,
    queryAtom: RecoilState<FindAllSubscriptionsQuery>,
    mergeMode = false,
) => {
    const defaultMergeMode = mergeMode;
    const orgId = useRecoilValue(orgIdParamState);
    const [result, setResult] = useRecoilState(resultAtom);
    const [query, setQuery] = useRecoilState(queryAtom);

    async function search(params: FindAllSubscriptionsQuery, mergeMode = defaultMergeMode, force = false) {
        if (!orgId || isNaN(orgId)) return;
        params.where = {organizationId: orgId, ...params.where};
        const request = () => subscriptionApi.index(params);
        cachePagedQuery(setResult, setQuery, params, request, mergeMode, force);
    }

    const reload = () => search({...query}, false, true);
    const movePage = (page: number, append = false) => search({...query, page}, append);
    const resetPage = () => search({...query, page: 1}, false, true);
    const append = makeAppendPagedItemFn(setResult);
    const except = makeExceptPagedItemFn(setResult, (it, item) => it.id !== item.id);

    return {query, result, search, reload, movePage, resetPage, except};
};

export const useSubscription = () => useRecoilValue(getSubscriptionQuery);
// export const useSubscription = () => {
//     const router = useRouter();
//     const appId = router.query.appId;
//     const [application, setSubscription] = useState<SubscriptionDto | null>(null);
//
//     useEffect(() => {
//         if (!appId || isNaN(appId)) return;
//
//         getSubscription(appId)
//             .then((res) => {
//                 setSubscription(res.data);
//             })
//             .catch(errorNotify);
//     }, [appId]);
//
//     return application;
// };

export const {paginatedListHook: useSubscriptionList} = makePaginatedListHookWithAtoms<number, SubscriptionDto>({
    subject: 'PaginatedApplicationList',
    buildParams: (organizationId, page, pagination) => ({
        where: {organizationId},
        order: {id: 'DESC'},
        page,
        itemsPerPage: 300,
    }),
    request: (_, params) => subscriptionApi.index(params),
});
