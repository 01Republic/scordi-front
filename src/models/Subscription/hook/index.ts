import {useState} from 'react';
import {AxiosResponse} from 'axios';
import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {teamApi} from '^models/Team/api';
import {subscriptionApi} from '^models/Subscription/api';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {Paginated} from '^types/utils/paginated.dto';
import {
    FindAllSubscriptionsQuery,
    FindOneSubscriptionQueryDto,
    SubscriptionDto,
    UpdateSubscriptionRequestDto,
} from 'src/models/Subscription/types';
import {invoiceAccountIdParamState, teamIdParamState, useOrgIdParam} from '^atoms/common';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';
import {usePagedResource, PagedResourceAtoms, usePaginateUtils} from '^hooks/usePagedResource';
import {
    addableSubscriptionsOfCreditCardAtom,
    addableSubscriptionsOfInvoiceAccountAtom,
    dashboardSubscriptionSearchResultAtom,
    getCurrentSubscriptionQuery,
    subscriptionListAtom,
    subscriptionListOfBankAccountAtom,
    subscriptionListOfInvoiceAccountAtom,
    subscriptionsForSummaryState,
    subscriptionsInTeamMemberShowModalAtom,
    subscriptionsInTeamShowPageAtom,
    subscriptionTableListAtom,
} from '^models/Subscription/atom';
import {ErrorResponse} from '^models/User/types';
import {SUBSCRIPTION_HOOK_KEY} from '^models/Subscription/hook/key';
import {MergeSubscriptionRequestDto} from '^models/Subscription/types/MergeSubscription.request.dto';
import {SplitSubscriptionByBillingHistoriesRequestDto} from '^models/Subscription/types/SplitSubscriptionByBillingHistories.request.dto';

export const useSubscriptionsV2 = () => useSubscriptions(subscriptionListAtom);

// 대시보드 / SummarySection 전용 조회
export const useDashboardSubscriptionSummary = () => useSubscriptions(subscriptionsForSummaryState);

// 대시보드 / 구독현황 테이블 - 구독목록조회
export const useDashboardSubscriptions = () => useSubscriptions(dashboardSubscriptionSearchResultAtom);

// 조직 홈 / 구독 검색 - 검색 결과
export const useSubscriptionSearchResult = () => useSubscriptions(dashboardSubscriptionSearchResultAtom);

// 구독리스트 / 구독목록조회
export const useSubscriptionTableListAtom = () => useSubscriptions(subscriptionTableListAtom);

// 팀 상세 페이지 / 이용중인 서비스 목록
export const useSubscriptionsInTeamShowPage = () =>
    useTeamSubscriptions(teamIdParamState, subscriptionsInTeamShowPageAtom);

// 팀멤버 상세모달 / 이용중인 서비스 목록
export const useSubscriptionsInTeamMemberShowModal = () =>
    useSubscriptions(subscriptionsInTeamMemberShowModalAtom, true);

// 팀멤버 상세페이지 / 이용중인 서비스 목록
export const useSubscriptionsInTeamMemberShowPage = () => useSubscriptions(subscriptionsInTeamMemberShowModalAtom);

// 계좌 상세 페이지 > 구독 테이블
export const useSubscriptionListOfBankAccount = () => useSubscriptions(subscriptionListOfBankAccountAtom);

// 카드 상세 페이지 > 구독 테이블 (신)
export const useSubscriptionListOfCreditCard2 = (
    organizationId: number,
    creditCardId: number,
    params: FindAllSubscriptionsQuery,
) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: [SUBSCRIPTION_HOOK_KEY.listOfCreditCard, organizationId, creditCardId, query],
        queryFn: () =>
            subscriptionApi
                .index({
                    ...query,
                    where: {organizationId, creditCardId, ...query.where},
                })
                .then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!organizationId && !!creditCardId,
    });

    const isEmptyResult = queryResult.data.items.length === 0;

    const search = (params: FindAllSubscriptionsQuery) => setQuery((q) => ({...q, ...params}));
    const movePage = (page: number) => search({page});
    const resetPage = () => movePage(1);
    const changePageSize = (pageSize: number) => search({page: 1, itemsPerPage: pageSize});
    const orderBy = (sortKey: string, value: 'ASC' | 'DESC') => {
        return setQuery((q) => ({
            ...q,
            order: {...q.order, [sortKey]: value},
            page: 1,
        }));
    };

    return {
        ...queryResult,
        query,
        isEmptyResult,
        search: setQuery,
        movePage,
        changePageSize,
        orderBy,
    };
};

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

export const useSubscriptions2 = (orgId: number, params: FindAllSubscriptionsQuery) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: ['useSubscriptions2', orgId, query],
        queryFn: () =>
            subscriptionApi
                .index({
                    ...query,
                    where: {organizationId: orgId, ...query.where},
                })
                .then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId,
    });

    return {
        ...queryResult,
        query,
        search: setQuery,
    };
};

const useTeamSubscriptions = (
    teamIdAtom: RecoilState<number>,
    atoms: PagedResourceAtoms<SubscriptionDto, FindAllSubscriptionsQuery>,
    mergeMode = false,
) => {
    const teamId = useRecoilValue(teamIdAtom);

    const {...methods} = usePagedResource(atoms, {
        endpoint: (params, orgId) => teamApi.subscriptions.index(orgId, teamId, params),
        useOrgId: true,
        buildQuery: (params, orgId) => {
            params.where = {organizationId: orgId, ...params.where};
            return params;
        },
        mergeMode,
        getId: 'id',
    });

    return {teamId, ...methods};
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
        endpoint: (params, _, [id]) => endpoint(id, params),
        useOrgId: true,
        buildQuery: (params, orgId) => {
            params.where = {organizationId: orgId, ...params.where};
            return params;
        },
        mergeMode,
        getId: 'id',
        dependencies: [invoiceAccountId],
        enabled: ([id]) => !!id && !isNaN(id),
    });
};

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

export const useWorkspaceSubscriptionCount = (orgId: number) => {
    return useQuery({
        queryKey: ['workspaceSubscriptionCount', orgId],
        queryFn: () => subscriptionApi.index({where: {organizationId: orgId}}).then((res) => res.data),
        enabled: !!orgId && !isNaN(orgId),
        initialData: Paginated.init(),
    });
};

/* tanstack Query   */

//구독 조회
export const useSubscription3 = (orgId: number, params: FindAllSubscriptionsQuery, manual?: boolean) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: [SUBSCRIPTION_HOOK_KEY.base, orgId, query],
        queryFn: () => subscriptionApi.index(query).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: manual ? false : !!orgId,
    });

    return usePaginateUtils({
        query,
        setQuery,
        queryResult,
    });
};

// 구독 상세조회
export const useShowSubscription = (subscriptionId?: number, params?: FindOneSubscriptionQueryDto) => {
    return useQuery<SubscriptionDto, ErrorResponse>({
        queryKey: [SUBSCRIPTION_HOOK_KEY.detail, subscriptionId, params],
        queryFn: () => subscriptionApi.show(subscriptionId!, params).then((res) => res.data),
        enabled: !!subscriptionId && !isNaN(subscriptionId),
    });
};

// 구독 업데이트
export const useUpdateSubscription = (subscriptionId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateSubscriptionRequestDto) =>
            subscriptionApi.update(subscriptionId, data).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.base]});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.list]});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.detail]});
        },
    });
};

//구독 삭제하기
export const useRemoveSubscription = (subscriptionId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => subscriptionApi.destroy(subscriptionId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.base]});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.list]});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.detail]});
        },
    });
};

//구독 병합하기
export const useMergeSubscriptions = () => {
    const queryClient = useQueryClient();
    return useMutation<SubscriptionDto[], ErrorResponse, {id: number; data: MergeSubscriptionRequestDto}>({
        mutationFn: ({id, data}) => subscriptionApi.merge(id, data).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.base], exact: false});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.list], exact: false});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.detail]});
        },
    });
};

// 팀 상세 p/구독 탭 - 구독 조회
export const useTeamSubscriptions2 = (orgId: number, teamId: number, params: FindAllSubscriptionsQuery) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: [SUBSCRIPTION_HOOK_KEY.base, orgId, query, teamId],
        queryFn: () => teamApi.subscriptions.index(orgId, teamId, query).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!teamId && !!orgId,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return usePaginateUtils({
        query,
        setQuery,
        queryResult,
    });
};

export const useSplitByBillingHistories = (subscriptionId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: SplitSubscriptionByBillingHistoriesRequestDto) =>
            subscriptionApi.splitByBillingHistories(subscriptionId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.detail]});
        },
    });
};
