import {useState} from 'react';
import {AxiosResponse} from 'axios';
import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {teamApi} from '^models/Team/api';
import {subscriptionApi} from '^models/Subscription/api';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllSubscriptionsQuery, SubscriptionDto} from 'src/models/Subscription/types';
import {invoiceAccountIdParamState, teamIdParamState} from '^atoms/common';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';
import {usePagedResource, PagedResourceAtoms} from '^hooks/usePagedResource';
import {
    addableSubscriptionsOfCreditCardAtom,
    addableSubscriptionsOfInvoiceAccountAtom,
    dashboardSubscriptionSearchResultAtom,
    getCurrentSubscriptionQuery,
    subscriptionListAtom,
    subscriptionListOfBankAccountAtom,
    subscriptionListOfCreditCardAtom,
    subscriptionListOfInvoiceAccountAtom,
    subscriptionsForSummaryState,
    subscriptionsInTeamMemberShowModalAtom,
    subscriptionsInTeamShowPageAtom,
    subscriptionTableListAtom,
} from '^models/Subscription/atom';

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
