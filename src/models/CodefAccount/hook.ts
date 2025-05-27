import {useEffect, useMemo, useState} from 'react';
import {QueryClient, QueryState, useQueries, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {codefAccountApi} from './api';
import {codefAccountsAlreadyIs, codefAccountsInConnector} from './atom';
import {CodefAccountDto} from './type/CodefAccountDto';
import {FindAllAccountQueryDto} from './type/find-all-account.query.dto';
import {FindAllBankAccountQueryDto} from '^models/CodefBankAccount/type/find-all.bank-account.query.dto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CodefCustomerType, CodefRequestBusinessType} from '^models/CodefAccount/type/enums';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {encryptValue} from '^utils/crypto';
import {CreateAccountRequestDto} from './type/create-account.request.dto';
import {
    AccountCreatedResponseDto,
    CodefAccountCreateErrorResponseDto,
} from '^models/CodefAccount/type/create-account.response.dto';
import {isDefinedValue} from '^utils/array';
import {AxiosError} from 'axios';
import {ApiErrorResponse} from '^api/api';
import {CodefApiResponseResultDto} from '^models/CodefAccount/codef-common';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {CodefCompanyStaticData} from '^models/CodefAccount/type/CodefCompanyStaticData';

/** 구독 불러오기 (연동페이지) 에서, 연결된 카드사 계정 리스트를 보여줄 때 사용 */
export const useCodefAccountsInConnector = () => useCodefAccountsV3(codefAccountsInConnector);

// codef 연결된 계정 조회
export const useCodefAccounts = (orgId: number, params: FindAllAccountQueryDto, key: string = '') => {
    return useQuery({
        queryKey: ['useCodefAccounts', orgId, params, key],
        queryFn: () => codefAccountApi.index(orgId, params).then((res) => res.data),
        enabled: !!orgId && !isNaN(orgId),
        initialData: Paginated.init(),
    });
};

/** 구독 불러오기 (연동페이지) 에서 > codef 연결된 계정 조회 */
export const useCodefAccountsInConnectorV2 = (orgId: number, params: FindAllAccountQueryDto = {}) => {
    const queryResult = useCodefAccounts(orgId, {sync: true, itemsPerPage: 0, ...params}, 'codefAccountsInConnectorV2');
    const codefAccounts = queryResult.data.items;

    const getCardAccounts = (clientType: CodefCustomerType) => {
        return codefAccounts.filter((account) => {
            return account.businessType === CodefRequestBusinessType.Card && account.clientType === clientType;
        });
    };

    const getBankAccounts = (clientType: CodefCustomerType) => {
        return codefAccounts.filter((account) => {
            return account.businessType === CodefRequestBusinessType.Bank && account.clientType === clientType;
        });
    };

    return {
        ...queryResult,
        codefAccounts,
        getCardAccounts,
        getBankAccounts,
    };
};

/** 구독 불러오기 (연동페이지) 계정등록 페이지 입력 폼 에서, 카드사 계정 연결 여부를 체크 할 때 사용 */
export const useCodefAccountsAlreadyIs = () => useCodefAccountsV3(codefAccountsAlreadyIs);

export const useCodefAccountsAlreadyIs2 = (orgId: number) => {
    const queryClient = useQueryClient();
    const [query, setQuery] = useState<FindAllAccountQueryDto>();
    const _search = (params: FindAllAccountQueryDto): Promise<Paginated<CodefAccountDto>> => {
        return queryClient.fetchQuery<Paginated<CodefAccountDto>>({
            queryKey: ['codefAccountsAlreadyIs2', orgId, params],
            queryFn: () => codefAccountApi.index(orgId, params).then((res) => res.data),
            initialData: Paginated.init(),
        });
    };

    const search = async (params: FindAllAccountQueryDto) => {
        setQuery(params);
        return _search(params);
    };

    const searchByCompany = (cardCompany: CardAccountsStaticData, params: FindAllAccountQueryDto = {}) =>
        search({
            ...params,
            where: {
                ...params.where,
                organization: cardCompany.param,
                clientType: cardCompany.clientType,
            },
        });

    const reload = async () => {
        if (!query) return;
        return _search(query);
    };

    return {
        search,
        searchByCompany,
        reload,
    };
};

const useCodefAccountsV3 = (atoms: PagedResourceAtoms<CodefAccountDto, FindAllAccountQueryDto>, mergeMode = false) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => codefAccountApi.index(orgId, params),
        getId: 'id',
        mergeMode,
    });
};

/* 코드에프 계좌 조회 - 은행사의 계좌를 조회 */
export const useFindBankAccount = (orgId: number, accountId: number, params?: FindAllBankAccountQueryDto) => {
    const queryParams = {
        sync: true,
        itemsPerPage: 0,
        ...params,
    };

    return useQuery({
        queryKey: ['findBankAccount', orgId, accountId, queryParams],
        queryFn: () =>
            codefAccountApi
                .findBankAccounts<CodefBankAccountDto>(orgId, accountId, queryParams)
                .then((res) => res.data),
        enabled: !!orgId && !isNaN(orgId),
    });
};

export * from './hooks/useCreateCodefAccount';
export * from './hooks/useCodefAccountsAdmin';
export * from './hooks/fetchCodefCardsByAccountInSafe';

/**
 * ## 아래 코드를 추상화 한 훅입니다.
 * ```
 *      useQueries({
 *         queries: selectedBankCompanies.map((company) => {
 *             const body = {
 *                 ...formData,
 *                 organization: company.param,
 *                 businessType: CodefRequestBusinessType.Bank,
 *                 password: encryptValue(formData.password, formData.id),
 *             };
 *
 *             return {
 *                 queryKey: ['createBankAccountsQuery', company.param],
 *                 queryFn: () => codefAccountApi.create(orgId, body).then((res) => res.data),
 *                 retry: 0,
 *             };
 *         }),
 *      });
 * ```
 */
export function useCreateCodefAccounts<T extends CodefCompanyStaticData>(
    orgId: number,
    companies: T[],
    getBody: (company: T) => CreateAccountRequestDto,
): UseQueryResult<AccountCreatedResponseDto, ApiErrorResponse<CodefAccountCreateErrorResponseDto>>[] {
    const businessTypes = {
        card: CodefRequestBusinessType.Card,
        bank: CodefRequestBusinessType.Bank,
    };

    const keys = {
        card: 'createCardAccountsQuery',
        bank: 'createBankAccountsQuery',
    };

    return useQueries({
        queries: companies.map((company) => {
            const about = company instanceof CardAccountsStaticData ? 'card' : 'bank';
            const businessType = businessTypes[about];
            const key = keys[about];

            const body = {
                ...getBody(company),
                organization: company.param,
                businessType,
            };

            return {
                queryKey: [key, orgId, company.param],
                queryFn: () => codefAccountApi.create(orgId, body).then((res) => res.data),
                retry: 0,
            };
        }),
    });
}

export interface CreateCodefAccountsResult<T extends CodefCompanyStaticData = CodefCompanyStaticData> {
    company: T;
    queryState: QueryState<AccountCreatedResponseDto, ApiErrorResponse<CodefAccountCreateErrorResponseDto>>;
}

export function getCreateCodefAccountsResults<T extends CodefCompanyStaticData>(
    orgId: number,
    companies: T[],
    queryClient: QueryClient,
): CreateCodefAccountsResult<T>[] {
    const keys = {
        card: 'createCardAccountsQuery',
        bank: 'createBankAccountsQuery',
    };

    return companies
        .map((company) => {
            const about = company instanceof CardAccountsStaticData ? 'card' : 'bank';
            const key = keys[about];
            const queryKey = [key, orgId, company.param];
            const queryState = queryClient.getQueryState<
                AccountCreatedResponseDto,
                ApiErrorResponse<CodefAccountCreateErrorResponseDto>
            >(queryKey);
            return queryState ? {company, queryState} : undefined;
        })
        .filter(isDefinedValue);
}

export function useCreateCodefAccountsResults<T extends CodefCompanyStaticData>(orgId: number, companies: T[]) {
    const [results, setResults] = useState<CreateCodefAccountsResult<T>[]>();
    const qc = useQueryClient();

    useEffect(() => {
        setResults(getCreateCodefAccountsResults(orgId, companies, qc));
    }, []);

    const isLoaded = !!results;
    const successes = (results || []).filter((result) => !result.queryState.error).map((result) => result.company);
    const failures = (results || [])
        .filter((result) => !!result.queryState.error)
        .map((result) => result.queryState.error?.response?.data.data)
        .filter(isDefinedValue);

    return {
        isLoaded,
        results,
        successes,
        failures,
    };
}
