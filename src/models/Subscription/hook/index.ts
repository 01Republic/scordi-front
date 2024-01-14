import {useRecoilState} from 'recoil';
import {FindAllSubscriptionsQuery, SubscriptionDto} from 'src/models/Subscription/types';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';
import {subscriptionApi} from '^models/Subscription/api';
import {usePagedResource, PagedResourceAtoms} from '^hooks/usePagedResource';
import {
    dashboardSubscriptionSearchResultAtom,
    getCurrentSubscriptionQuery,
    subscriptionListAtom,
    subscriptionsForSummaryPanelAtom,
    subscriptionsForSummaryState,
    subscriptionsInTeamMemberShowModalAtom,
    subscriptionTableListAtom,
} from '^models/Subscription/atom';

export const useSubscriptionsV2 = () => useSubscriptions(subscriptionListAtom);

// 대시보드 / SummarySection 전용 조회
export const useDashboardSubscriptionSummary = () => useSubscriptions(subscriptionsForSummaryState);

// 대시보드 / 구독현황 테이블 - 구독목록조회
export const useDashboardSubscriptions = () => useSubscriptions(dashboardSubscriptionSearchResultAtom);

// 구독리스트 / SummarySection 전용 조회
export const useSubscriptionMenuSummary = () => useSubscriptions(subscriptionsForSummaryPanelAtom);

// 구독리스트 / 구독목록조회
export const useSubscriptionTableListAtom = () => useSubscriptions(subscriptionTableListAtom);

// 팀멤버 상세모달 / 이용중인 서비스 목록
export const useSubscriptionsInTeamMemberShowModal = () =>
    useSubscriptions(subscriptionsInTeamMemberShowModalAtom, true);

const useSubscriptions = (atoms: PagedResourceAtoms<SubscriptionDto, FindAllSubscriptionsQuery>, mergeMode = false) => {
    return usePagedResource(atoms, {
        endpoint: (params) => subscriptionApi.index(params),
        useOrgId: true,
        buildQuery: (params, orgId) => {
            params.where = {organizationId: orgId, ...params.where};
            return params;
        },
        mergeMode,
        getId: 'id',
    });
};

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

export const useCurrentSubscription = () => {
    const [currentSubscription, reload] = useRecoilState(getCurrentSubscriptionQuery);
    return {currentSubscription, reload: () => reload((v) => v)};
};

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
