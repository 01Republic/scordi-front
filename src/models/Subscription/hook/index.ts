import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {FindAllSubscriptionsQuery, SubscriptionDto} from 'src/models/Subscription/types';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';
import {subscriptionApi} from '^models/Subscription/api';
import {usePagedResource, PagedResourceAtoms, cachePagedQuery, UsePagedResourceOption} from '^hooks/usePagedResource';
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
import {useState} from 'react';
import {invoiceAccountIdParamState} from '^atoms/common';
import {Paginated} from '^types/utils/paginated.dto';
import {AxiosResponse} from 'axios';

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
export const useSubscriptionListOfInvoiceAccount = () => {
    return useInvoiceAccountSubscriptions(
        invoiceAccountIdParamState,
        subscriptionListOfInvoiceAccountAtom,
        invoiceAccountApi.subscriptionsApi.index,
    );
};

// 청구서수신계정 상세 페이지 > 구독 연결 모달
export const useAddableSubscriptionsOfInvoiceAccount = () => {
    return useInvoiceAccountSubscriptions(
        invoiceAccountIdParamState,
        addableSubscriptionsOfInvoiceAccountAtom,
        invoiceAccountApi.subscriptionsApi.addable,
    );
};

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

const useInvoiceAccountSubscriptions = (
    invoiceAccountIdAtom: RecoilState<number>,
    atoms: PagedResourceAtoms<SubscriptionDto, FindAllSubscriptionsQuery>,
    endpoint: (
        invoiceAccountId: number,
        params: FindAllSubscriptionsQuery,
    ) => Promise<AxiosResponse<Paginated<SubscriptionDto>>>,
    mergeMode = false,
) => {
    const invoiceAccountId = useRecoilValue(invoiceAccountIdAtom);

    return usePagedResource(atoms, {
        endpoint: (params) => endpoint(invoiceAccountId, params),
        useOrgId: true,
        buildQuery: (params, orgId) => {
            params.where = {organizationId: orgId, ...params.where};
            return params;
        },
        mergeMode,
        getId: 'id',
        dependencies: [invoiceAccountId],
    });
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
