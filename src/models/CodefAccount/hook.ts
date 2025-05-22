import {useMemo, useState} from 'react';
import {useQueries, useQuery, useQueryClient} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {codefAccountApi} from './api';
import {codefAccountsAlreadyIs, codefAccountsInConnector} from './atom';
import {CodefAccountDto} from './type/CodefAccountDto';
import {FindAllAccountQueryDto} from './type/find-all-account.query.dto';
import {FindAllBankAccountQueryDto} from '^models/CodefBankAccount/type/find-all.bank-account.query.dto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

/** 구독 불러오기 (연동페이지) 에서, 연결된 카드사 계정 리스트를 보여줄 때 사용 */
export const useCodefAccountsInConnector = () => useCodefAccountsV3(codefAccountsInConnector);

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

/* 코드에프 계좌 조회 - 여러은행사의 계좌를 조회 */
export const useFindBankAccounts = (orgId: number, accountIds: number[], params?: FindAllBankAccountQueryDto) => {
    const queryResults = useQueries({
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
                queryFn: () =>
                    codefAccountApi
                        .findBankAccounts<CodefBankAccountDto>(orgId, accountId, queryParams)
                        .then((res) => res.data.items),
                enabled: !!orgId && !isNaN(orgId) && accountId != null,
            };
        }),
    });

    const items = useMemo(
        () => queryResults.map((codefBankAccount) => codefBankAccount.data ?? []).flat(),
        [queryResults],
    );

    const isLoading = queryResults.some((codefBankAccount) => codefBankAccount.isLoading);
    const isError = queryResults.some((codefBankAccount) => codefBankAccount.isError);

    return {items, isLoading, isError};
};

export * from './hooks/useCreateCodefAccount';
export * from './hooks/useCodefAccountsAdmin';
export * from './hooks/fetchCodefCardsByAccountInSafe';
