import {useState} from 'react';
import {RecoilState, useRecoilValue} from 'recoil';
import {useQueries, useQuery} from '@tanstack/react-query';
import {PagedResourceAtoms, usePagedResource, usePaginateUtils} from '^hooks/usePagedResource';
import {CodefCardDto} from './type/CodefCard.dto';
import {Paginated} from '^types/utils/paginated.dto';
import {SubscriptionDto} from '^models/Subscription/types';
import {FindAllCardAdminQueryDto, FindAllCardQueryDto} from './type/find-all.card.query.dto';
import {FindAllSubscriptionByCardQueryDto} from '^models/CodefCard/type/find-all.card-subscription.query.dto';
import {codefAccountApi} from '^models/CodefAccount/api';
import {codefCardAdminApi, codefCardApi} from '^models/CodefCard/api';
import {
    connectedCodefCardsAtom,
    newCodefCardsAtom,
    subscriptionsForAccountAtom,
    subscriptionsForCardAtom,
} from '^models/CodefCard/atom';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {uniqBy} from 'lodash';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {pick} from '^types/utils/one-of-list.type';

// 카드 상세 페이지에서, 연결된 코드에프 카드를 불러올때 사용 (신)
export const useCodefCardsOfCreditCardShow2 = (creditCardId: number) => {
    const orgId = useOrgIdParam();
    const queryResult = useQuery({
        queryKey: ['useCodefCardsOfCreditCardShow2', orgId, creditCardId],
        queryFn: () =>
            codefCardApi
                .index(orgId, {
                    relations: ['account'],
                    where: {creditCardId},
                    order: {id: 'DESC'},
                })
                .then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId && !!creditCardId,
    });

    const currentCodefCard = pick(queryResult.data.items[0]);

    return {...queryResult, currentCodefCard};
};

const useCodefCardsV3 = (atoms: PagedResourceAtoms<CodefCardDto, FindAllCardQueryDto>, mergeMode = false) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => codefCardApi.index(orgId, params),
        getId: 'id',
        mergeMode,
    });
};

/***
 * ADMIN
 */

export const useAdminCodefCards2 = (orgId: number | undefined, params?: FindAllCardAdminQueryDto) => {
    const [query, setQuery] = useState(params || {});
    const queryResult = useQuery({
        queryKey: ['admin/useCodefCards2', orgId, query],
        queryFn: () => {
            const {...q} = query || {};
            q.organizationId = orgId;
            return codefCardAdminApi.index(q).then((res) => res.data);
        },
        initialData: Paginated.init(),
        enabled: !!orgId && !!Object.keys(query).length,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return usePaginateUtils({query, queryResult, setQuery});
};

/***
 * Of Account
 * ====================
 */

/** 구독 불러오기 (연동페이지) 에서, 연결된 카드사의 카드 리스트를 보여줄 때 사용 */
export const useNewCodefCards = (codefAccountIdAtom: RecoilState<number>) => {
    return useCodefCardsOfAccount(codefAccountIdAtom, newCodefCardsAtom);
};

export const useNewCodefCards2 = (
    orgId: number,
    accountId: number,
    params?: FindAllCardQueryDto,
    options?: {
        onError?: (e: any) => any;
    },
) => useCodefCardsOfAccount2('newCodefCards', orgId, accountId, params, options);

export const useConnectedCodefCards = (codefAccountIdAtom: RecoilState<number>) => {
    return useCodefCardsOfAccount(codefAccountIdAtom, connectedCodefCardsAtom);
};

const useCodefCardsOfAccount = <DTO = CodefCardDto, QUERY = FindAllCardQueryDto>(
    codefAccountIdAtom: RecoilState<number>,
    atoms: PagedResourceAtoms<DTO, QUERY>,
    mergeMode = false,
) => {
    const codefAccountId = useRecoilValue(codefAccountIdAtom);
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => codefAccountApi.findCards(orgId, codefAccountId, params),
        // @ts-ignore
        getId: 'id',
        mergeMode,
    });
};

function useCodefCardsOfAccount2(
    name: string,
    orgId: number,
    accountId: number,
    params?: FindAllCardQueryDto,
    options?: {
        onError?: (e: any) => any;
    },
) {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: [name, orgId, accountId, params],
        queryFn: () => codefAccountApi.findCards(orgId, accountId, params).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId && !!accountId,
        retry: 0,
    });

    const reset = () => setQuery(undefined);

    return {
        query,
        ...queryResult,
        reset,
    };
}

export const useSubscriptionsForCodefAccount = (codefAccountIdAtom: RecoilState<number>) => {
    return useSubscriptionsOfCodefAccount(codefAccountIdAtom, subscriptionsForAccountAtom);
};

export const useSubscriptionsForCard = (codefAccountIdAtom: RecoilState<number>) => {
    return useSubscriptionsOfCodefAccount(codefAccountIdAtom, subscriptionsForCardAtom);
};

const useSubscriptionsOfCodefAccount = (
    codefAccountIdAtom: RecoilState<number>,
    atoms: PagedResourceAtoms<SubscriptionDto, FindAllSubscriptionByCardQueryDto>,
    mergeMode = false,
) => {
    const codefAccountId = useRecoilValue(codefAccountIdAtom);
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => codefAccountApi.findSubscriptions(orgId, codefAccountId, params),
        // @ts-ignore
        getId: 'id',
        mergeMode,
    });
};

/* 코드에프 계좌 조회 - 여러커드사의 카드를 조회 */
export const useFindCardAccounts = (orgId: number, accountIds: number[], params?: FindAllCardQueryDto) => {
    const results = useQueries({
        queries: accountIds.map((accountId) => {
            const queryParams = {
                relations: ['account'],
                sync: true,
                itemsPerPage: 0,
                ...params,
            };

            return {
                queryKey: ['findCardsByAccountIds', orgId, accountId, queryParams],
                queryFn: () => codefAccountApi.findCards(orgId, accountId, queryParams).then((res) => res.data.items),
                enabled: !!orgId && !isNaN(orgId) && !!accountId,
                // initialData: [],
                retry: 0,
                retryOnMount: false,
                refetchOnReconnect: false,
                refetchOnWindowFocus: false,
            };
        }),
    });

    const data = results.flatMap((result) => result.data || []);
    const loadings = results.filter((result) => result.isFetching);
    const isLoading = loadings.length > 0;
    const isError = results.some((result) => result.isError);
    const errors = results.filter((result) => result.isError);
    const allConnected = data.every((item) => item.isConnected);

    return {data, loadings, isLoading, isError, errors, allConnected};
};

/** 기관코드를 통해 연결된 카드목록을 조회 */
export const useCodefCardsByCompanies = (orgId: number, companies: CardAccountsStaticData[]) => {
    const companyCodes = companies.map((company) => company.param);
    const {
        data: codefAccounts,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ['codefAccounts.useCodefCardsByCompanies', orgId, companies],
        queryFn: () => {
            return codefAccountApi
                .index(orgId, {
                    where: {
                        organization: {op: 'in', val: companyCodes},
                    },
                    itemsPerPage: 0,
                })
                .then((res) => res.data.items);
        },
        enabled: !!orgId && companies.length > 0,
        initialData: [],
        refetchOnWindowFocus: false,
        // refetchOnMount: false,
    });

    const codefAccountIds = codefAccounts.map((account) => account.id);

    const dbQuery = useFindCardAccounts(orgId, codefAccountIds, {sync: false});

    const syncQuery = useFindCardAccounts(orgId, codefAccountIds);

    return {
        dbQuery,
        syncQuery,
        data: uniqBy([...syncQuery.data, ...dbQuery.data], (item) => item.id),
        isLoading: isFetching || dbQuery.isLoading || syncQuery.isLoading,
        isError: isError || dbQuery.isError || syncQuery.isError,
        errors: syncQuery.isLoading ? dbQuery.errors : syncQuery.errors,
        allConnected: syncQuery.allConnected,
    };
};
