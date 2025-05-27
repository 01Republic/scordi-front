import React, {useMemo, useState} from 'react';
import {RecoilState, useRecoilValue} from 'recoil';
import {useMutation, useQueries, useQuery, useQueryClient} from '@tanstack/react-query';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {CodefCardDto} from './type/CodefCard.dto';
import {ErrorResponse} from '^models/User/types';
import {Paginated} from '^types/utils/paginated.dto';
import {SubscriptionDto} from '^models/Subscription/types';
import {FindAllAccountQueryDto} from '^models/CodefAccount/type/find-all-account.query.dto';
import {FindAllCardAdminQueryDto, FindAllCardQueryDto} from './type/find-all.card.query.dto';
import {FindAllSubscriptionByCardQueryDto} from '^models/CodefCard/type/find-all.card-subscription.query.dto';
import {codefAccountApi} from '^models/CodefAccount/api';
import {codefCardAdminApi, codefCardApi} from '^models/CodefCard/api';
import {
    codefCardsAdminAtom,
    codefCardsAtom,
    codefCardsOfCreditCardShowAtom,
    connectedCodefCardsAtom,
    newCodefCardsAtom,
    subscriptionsForAccountAtom,
    subscriptionsForCardAtom,
} from '^models/CodefCard/atom';
import {confirm3} from '^components/util/dialog/confirm3';
import {confirmed} from '^components/util/dialog';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {CodefLoginType} from '^models/CodefAccount/type/enums';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';

export const useCodefCards = (mergeMode = false) => useCodefCardsV3(codefCardsAtom, mergeMode);

/** 카드 상세 페이지에서, 연결된 코드에프 카드를 불러올때 사용 */
export const useCodefCardsOfCreditCardShow = () => useCodefCardsV3(codefCardsOfCreditCardShowAtom);

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

export const useAdminCodefCards = () => useCodefCardsAdmin(codefCardsAdminAtom);

const useCodefCardsAdmin = (atoms: PagedResourceAtoms<CodefCardDto, FindAllCardAdminQueryDto>, mergeMode = false) => {
    return usePagedResource(atoms, {
        useOrgId: false,
        endpoint: (params) => codefCardAdminApi.index(params),
        // @ts-ignore
        getId: 'id',
        mergeMode,
    });
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

export const useCodefAccount = (loginType: CodefLoginType) => {
    const queryClient = useQueryClient();
    const params: FindAllAccountQueryDto = {
        where: {loginType},
        sync: true,
        itemsPerPage: 0,
    };

    // codef 연결된 계정 조회
    const useCodefAccountsInConnector = (orgId: number) => {
        return useQuery({
            queryKey: ['codefAccount', orgId, params],
            queryFn: () => codefAccountApi.index(orgId, params).then((res) => res.data),
            enabled: !!orgId && !isNaN(orgId),
            initialData: Paginated.init(),
        });
    };

    // codef 연결된 계정 삭제
    const {mutate: removeCodefAccount} = useMutation<boolean, ErrorResponse, {orgId: number; accountId: number}>({
        mutationFn: ({orgId, accountId}) => codefAccountApi.destroy(orgId, accountId).then((res) => res.data),
        onSuccess: (_, {orgId}) => {
            queryClient.invalidateQueries({queryKey: ['codefAccount', orgId, params]});
        },
    });

    return {useCodefAccountsInConnector, removeCodefAccount};
};

/* 코드에프 계좌 조회 - 여러커드사의 카드를 조회 */
export const useFindCardAccounts = (orgId: number, accountIds: number[], params?: FindAllCardQueryDto) => {
    const results = useQueries({
        queries: accountIds.map((accountId) => {
            const queryParams = {
                relations: ['account'],
                where: {accountId: accountId},
                sync: true,
                itemsPerPage: 0,
                ...params,
            };

            return {
                queryKey: ['findBankAccounts', orgId, accountId, queryParams],
                queryFn: () => codefAccountApi.findCards(orgId, accountId, queryParams).then((res) => res.data.items),
                enabled: !!orgId && !isNaN(orgId) && accountId != null,
                initialData: [],
            };
        }),
    });

    const data = results.flatMap((result) => result.data || []);
    const isFetching = results.some((result) => result.isFetching);
    const isError = results.some((result) => result.isError);
    const errors = results.filter((result) => result.isError);

    return {data, isFetching, isError, errors};
};

/** 기관코드를 통해 연결된 카드목록을 조회 */
export const useCodefCardsByCompanies = (orgId: number, companies: CardAccountsStaticData[]) => {
    const companyCodes = companies.map((company) => company.param);
    const {data: codefAccounts} = useQuery({
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
    });

    return useFindCardAccounts(
        orgId,
        codefAccounts.map((account) => account.id),
    );
};
