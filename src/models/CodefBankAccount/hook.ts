import {useMutation, useQueries, useQuery, useQueryClient} from '@tanstack/react-query';
import {uniqBy} from 'lodash';
import {
    FindAllBankAccountAdminQueryDto,
    FindAllBankAccountQueryDto,
} from '^models/CodefBankAccount/type/find-all.bank-account.query.dto';
import {Paginated} from '^types/utils/paginated.dto';
import {codefBankAccountAdminApi, codefBankAccountApi} from '^models/CodefBankAccount/api';
import {ErrorResponse} from '^models/User/types';
import {codefAccountApi} from '^models/CodefAccount/api';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {usePagedResource, usePaginateUtils} from '^hooks/usePagedResource';
import {useState} from 'react';
import {PatchFinalCodefBankAccountHistoriesDto} from '^models/CodefBankAccount/type/patch-final.codef-bank-account.histories.dto';

/* 코드에프 계좌 조회 */
export const useCodefBankAccount = () => {
    const queryClient = useQueryClient();
    const params: FindAllBankAccountQueryDto = {
        sync: true,
        itemsPerPage: 0,
    };

    // 스코디 계좌 생성
    const {mutateAsync: createScordiBankAccount} = useMutation<
        CodefBankAccountDto,
        ErrorResponse,
        {orgId: number; accountId: number}
    >({
        mutationFn: ({orgId, accountId}) =>
            codefBankAccountApi.createBankAccount(orgId, accountId).then((res) => res.data),
        onSuccess: (_, {orgId}) => {
            queryClient.invalidateQueries({queryKey: ['codefAccount', orgId, params]});
        },
    });

    return {createScordiBankAccount};
};

// codef 연결된 계좌 조회
export const useCodefBankAccountsInConnector = (orgId?: number, params?: FindAllBankAccountQueryDto) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: ['codefAccount', orgId, query],
        queryFn: () => codefBankAccountApi.index(orgId!, params).then((res) => res.data),
        enabled: !!orgId && !isNaN(orgId),
        initialData: Paginated.init(),
    });

    return {query, setQuery, ...queryResult};
};

/* 코드에프 계좌 조회 - 여러은행사의 계좌를 조회 */
export const useFindBankAccounts = (orgId: number, accountIds: number[], params?: FindAllBankAccountQueryDto) => {
    const results = useQueries({
        queries: accountIds.map((accountId) => {
            const queryParams = {
                relations: ['account'],
                sync: true,
                itemsPerPage: 0,
                ...params,
            };

            return {
                queryKey: ['findBankAccountsByAccountIds', orgId, accountId, queryParams],
                queryFn: () =>
                    codefAccountApi.findBankAccounts(orgId, accountId, queryParams).then((res) => res.data.items),
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

/** 기관코드를 통해 연결된 계좌목록을 조회 */
export const useCodefBankAccountsByCompanies = (orgId: number, companies: BankAccountsStaticData[]) => {
    const companyCodes = companies.map((company) => company.param);
    const {
        data: codefAccounts,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ['codefAccounts.useCodefBankAccountsByCompanies', orgId, companies],
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

    const dbQuery = useFindBankAccounts(orgId, codefAccountIds, {sync: false});

    const syncQuery = useFindBankAccounts(orgId, codefAccountIds);

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

/** 결제내역 조회 실행 완료 signal 및 나머지 동기화 처리 */

export const useBankAccountFinalHistories = (orgId: number) => {
    return useMutation({
        mutationFn: (dto: PatchFinalCodefBankAccountHistoriesDto) =>
            codefBankAccountApi.patchFinalHistories(orgId, dto),
    });
};

/***
 * ADMIN
 */

export const useAdminCodefBankAccounts2 = (orgId: number | undefined, params?: FindAllBankAccountAdminQueryDto) => {
    const [query, setQuery] = useState(params || {});
    const queryResult = useQuery({
        queryKey: ['admin/useAdminCodefBankAccounts2', orgId, query],
        queryFn: () => {
            const {...q} = query || {};
            q.organizationId = orgId;
            return codefBankAccountAdminApi.index(q).then((res) => res.data);
        },
        initialData: Paginated.init(),
        enabled: !!orgId && !!Object.keys(query).length,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return usePaginateUtils({query, queryResult, setQuery});
};
