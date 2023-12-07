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

export const useCurrentSubscription = () => {
    const [currentSubscription, reload] = useRecoilState(getCurrentSubscriptionQuery);
    return {currentSubscription, reload: () => reload((v) => v)};
};

export const index = () => useRecoilValue(getSubscriptionsQuery);

export const useSubscriptionsV2 = () => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const [result, setResult] = useRecoilState(subscriptionsSearchResultAtom);
    const [query, setQuery] = useRecoilState(getSubscriptionsQueryAtom);

    async function search(params: FindAllSubscriptionsQuery) {
        if (!orgId) return;

        params.where = {organizationId: orgId, ...params.where};

        const data = await subscriptionApi.index(params).then((res) => res.data);
        setResult(data);
        setQuery(params);

        return data;
    }

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, movePage};
};

export const useSubscriptionsV3 = (
    resultAtom: RecoilState<Paginated<SubscriptionDto>>,
    queryAtom: RecoilState<FindAllSubscriptionsQuery>,
    mergeMode = false,
) => {
    const orgId = useRecoilValue(orgIdParamState);
    const [result, setResult] = useRecoilState(resultAtom);
    const [query, setQuery] = useRecoilState(queryAtom);

    async function search(params: FindAllSubscriptionsQuery) {
        if (!orgId) return;

        params.where = {organizationId: orgId, ...params.where};

        const data = await subscriptionApi.index(params).then((res) => res.data);
        if (mergeMode) {
            setResult(({items}) => {
                const newItems = [...items, ...data.items];
                return {items: newItems, pagination: data.pagination};
            });
        } else {
            setResult(data);
        }

        setQuery(params);

        return data;
    }

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, movePage};
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
