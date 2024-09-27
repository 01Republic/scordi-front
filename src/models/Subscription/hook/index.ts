import {useRecoilState} from 'recoil';
import {FindAllSubscriptionsQuery, SubscriptionDto} from 'src/models/Subscription/types';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';
import {subscriptionApi} from '^models/Subscription/api';
import {usePagedResource, PagedResourceAtoms} from '^hooks/usePagedResource';
import {
    addableSubscriptionsOfCreditCardAtom,
    addableSubscriptionsOfInvoiceAccountAtom,
    dashboardSubscriptionSearchResultAtom,
    getCurrentSubscriptionQuery,
    subscriptionListAtom,
    subscriptionListOfCreditCardAtom,
    subscriptionListOfInvoiceAccountAtom,
    subscriptionsForSummaryState,
    subscriptionsInTeamMemberShowModalAtom,
    subscriptionTableListAtom,
} from '^models/Subscription/atom';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {useQuery} from '@tanstack/react-query';

export const useSubscriptionsV2 = () => useSubscriptions(subscriptionListAtom);

// 대시보드 / SummarySection 전용 조회
export const useDashboardSubscriptionSummary = () => useSubscriptions(subscriptionsForSummaryState);

// 대시보드 / 구독현황 테이블 - 구독목록조회
export const useDashboardSubscriptions = () => useSubscriptions(dashboardSubscriptionSearchResultAtom);

// 조직 홈 / 구독 검색 - 검색 결과
export const useSubscriptionSearchResult = () => useSubscriptions(dashboardSubscriptionSearchResultAtom);

// 구독리스트 / 구독목록조회
export const useSubscriptionTableListAtom = () => useSubscriptions(subscriptionTableListAtom);

// 팀멤버 상세모달 / 이용중인 서비스 목록
export const useSubscriptionsInTeamMemberShowModal = () =>
    useSubscriptions(subscriptionsInTeamMemberShowModalAtom, true);

// 팀멤버 상세페이지 / 이용중인 서비스 목록
export const useSubscriptionsInTeamMemberShowPage = () => useSubscriptions(subscriptionsInTeamMemberShowModalAtom);

// 카드 상세 페이지 > 구독 테이블
export const useSubscriptionListOfCreditCard = () => useSubscriptions(subscriptionListOfCreditCardAtom);

// 카드 상세 페이지 > 구독 연결 모달
export const useAddableSubscriptionsOfCreditCard = () => useSubscriptions(addableSubscriptionsOfCreditCardAtom);

// 청구서수신계정 상세 페이지 > 구독 테이블
export const useSubscriptionListOfInvoiceAccount = () =>
    useInvoiceAccountSubscriptions(subscriptionListOfInvoiceAccountAtom);

// 청구서수신계정 상세 페이지 > 구독 연결 모달
export const useAddableSubscriptionsOfInvoiceAccount = () => useSubscriptions(addableSubscriptionsOfInvoiceAccountAtom);

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

// type P = Parameters<typeof invoiceAccountApi.subscriptionsApi.index>;

const useInvoiceAccountSubscriptions = (
    atoms: PagedResourceAtoms<SubscriptionDto, FindAllSubscriptionsQuery>,
    mergeMode = false,
) => {
    const {resultAtom, queryAtom, isLoadingAtom, isNotLoadedAtom} = atoms;
    const [result, setResult] = useRecoilState(resultAtom);
    const [query, setQuery] = useRecoilState(queryAtom);
    const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
    const [isNotLoaded, setIsNotLoaded] = useRecoilState(isNotLoadedAtom);
    const {search, ...res} = usePagedResource(atoms, {
        endpoint: invoiceAccountApi.subscriptionsApi.index,
        useOrgId: true,
        buildQuery: (params, orgId) => {
            params.where = {organizationId: orgId, ...params.where};
            return params;
        },
        mergeMode,
        getId: 'id',
    });

    const search2 = (
        invoiceAccountId: number,
        params: FindAllSubscriptionsQuery,
        _mergeMode = mergeMode,
        force = false,
    ) => {
        const endpoint = invoiceAccountApi.subscriptionsApi.index;
        return new Promise((resolve, reject) => {
            setQuery((oldQuery) => {
                if (!force && JSON.stringify(oldQuery) === JSON.stringify(params)) return oldQuery;

                const req = endpoint(invoiceAccountId, params).then((res) => res.data);
                req.catch(reject);
                req.then((data) => {
                    if (_mergeMode) {
                        setResult((oldResult) => {
                            const items = [...oldResult.items, ...data.items];
                            const pagination = data.pagination;
                            pagination.currentItemCount = items.length;
                            const merged = {items, pagination};
                            resolve(merged);
                            return merged;
                        });
                    } else {
                        resolve(data);
                        setResult(data);
                    }
                });

                return params;
            });
        });
    };

    return {search: search2, ...res};
};

// const useInvoiceAccountSubscriptions = () => {
//     return useQuery({
//         queryKey: ['useInvoiceAccountSubscriptions'],
//         queryFn: () => invoiceAccountApi.subscriptionsApi.index(),
//     });
// };

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
