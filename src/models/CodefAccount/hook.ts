import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {codefAccountApi} from './api';
import {codefAccountsAlreadyIs, codefAccountsInConnector} from './atom';
import {CodefAccountDto} from './type/CodefAccountDto';
import {FindAllAccountQueryDto} from './type/find-all-account.query.dto';
import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import useSyncMutation from '^utils/useSyncMutation';

/** 구독 불러오기 (연동페이지) 에서, 연결된 카드사 계정 리스트를 보여줄 때 사용 */
export const useCodefAccountsInConnector = () => useCodefAccountsV3(codefAccountsInConnector);

/** 구독 불러오기 (연동페이지) 계정등록 페이지 입력 폼 에서, 카드사 계정 연결 여부를 체크 할 때 사용 */
export const useCodefAccountsAlreadyIs = () => useCodefAccountsV3(codefAccountsAlreadyIs);

export const useCodefAccountsAlreadyIs2 = (orgId: number) => {
    const queryClient = useQueryClient();
    const [query, setQuery] = useState<FindAllAccountQueryDto>();
    const _search = (params: FindAllAccountQueryDto) => {
        return queryClient.fetchQuery({
            queryKey: ['codefAccountsAlreadyIs2', orgId, params],
            queryFn: () => codefAccountApi.index(orgId, params).then((res) => res.data),
            initialData: Paginated.init(),
        });
    };

    const search = async (params: FindAllAccountQueryDto) => {
        setQuery(params);
        return _search(params);
    };

    const reload = async () => {
        if (!query) return;
        return _search(query);
    };

    return {
        search,
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

export * from './hooks/useCreateCodefAccount';
export * from './hooks/useCodefAccountsAdmin';
