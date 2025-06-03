import {useMutation, useQueries, useQuery, useQueryClient} from '@tanstack/react-query';
import {uniqBy} from 'lodash';
import {FindAllBankAccountQueryDto} from '^models/CodefBankAccount/type/find-all.bank-account.query.dto';
import {Paginated} from '^types/utils/paginated.dto';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';
import {ErrorResponse} from '^models/User/types';
import {codefAccountApi} from '^models/CodefAccount/api';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';

/* 코드에프 계좌 조회 */
export const useCodefBankAccount = () => {
    const queryClient = useQueryClient();
    const params: FindAllBankAccountQueryDto = {
        sync: true,
        itemsPerPage: 0,
    };

    // codef 연결된 계좌 조회
    const useCodefBankAccountsInConnector = (orgId: number, params?: FindAllBankAccountQueryDto) => {
        return useQuery({
            queryKey: ['codefAccount', orgId, params],
            queryFn: () => codefBankAccountApi.index(orgId, params).then((res) => res.data),
            enabled: !!orgId && !isNaN(orgId),
            initialData: Paginated.init(),
        });
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

    return {useCodefBankAccountsInConnector, createScordiBankAccount};
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
    const {data: codefAccounts} = useQuery({
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
    });

    const codefAccountIds = codefAccounts.map((account) => account.id);

    const dbQuery = useFindBankAccounts(orgId, codefAccountIds, {sync: false});

    const syncQuery = useFindBankAccounts(orgId, codefAccountIds);

    return {
        dbQuery,
        syncQuery,
        data: uniqBy([...syncQuery.data, ...dbQuery.data], (item) => item.id),
        isLoading: dbQuery.isLoading || syncQuery.isLoading,
        isError: dbQuery.isError || syncQuery.isError,
        errors: syncQuery.isLoading ? dbQuery.errors : syncQuery.errors,
        allConnected: syncQuery.allConnected,
    };
};
