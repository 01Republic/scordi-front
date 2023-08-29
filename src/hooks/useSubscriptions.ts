import {SubscriptionDto} from '^types/subscription.type';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getSubscriptionQuery, getSubscriptionsQuery, getCurrentSubscriptionQuery} from '^atoms/subscriptions.atom';
import {getSubscriptions} from '^api/subscription.api';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';

export const useCurrentSubscription = () => {
    const [currentSubscription, reload] = useRecoilState(getCurrentSubscriptionQuery);
    return {currentSubscription, reload: () => reload((v) => v)};
};

export const useSubscriptions = () => useRecoilValue(getSubscriptionsQuery);
export const useSubscription = () => useRecoilValue(getSubscriptionQuery);
// export const useSubscription = () => {
//     const router = useRouter();
//     const appId = router.query.appId;
//     const [application, setApplication] = useState<SubscriptionDto | null>(null);
//
//     useEffect(() => {
//         if (!appId || isNaN(appId)) return;
//
//         getSubscription(appId)
//             .then((res) => {
//                 setApplication(res.data);
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
