import {FindAllSubscriptionsQuery, SubscriptionDto} from '^types/subscription.type';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
    getSubscriptionQuery,
    getSubscriptionsQuery,
    getCurrentSubscriptionQuery,
    getSubscriptionsQueryAtom,
    subscriptionsSearchResultAtom,
} from '^atoms/subscriptions.atom';
import {getSubscriptions} from '^api/subscription.api';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentUser} from '^hooks/useCurrentUser';

export const useCurrentSubscription = () => {
    const [currentSubscription, reload] = useRecoilState(getCurrentSubscriptionQuery);
    return {currentSubscription, reload: () => reload((v) => v)};
};

export const useSubscriptions = () => useRecoilValue(getSubscriptionsQuery);

export const useSubscriptionsV2 = () => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const [result, setResult] = useRecoilState(subscriptionsSearchResultAtom);
    const [query, setQuery] = useRecoilState(getSubscriptionsQueryAtom);

    async function search(params: FindAllSubscriptionsQuery) {
        if (!orgId) return;

        params.where = {organizationId: orgId, ...params.where};

        const data = await getSubscriptions(params).then((res) => res.data);
        setResult(data);
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
    request: (_, params) => getSubscriptions(params),
});
