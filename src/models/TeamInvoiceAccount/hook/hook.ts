import {PagedResourceAtoms, usePagedResource, usePaginateUtils} from '^hooks/usePagedResource';
import {FindAllTeamInvoiceAccountQueryDto, TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';
import {teamInvoiceAccountApi} from '^models/TeamInvoiceAccount/api';
import {
    teamInvoiceAccountListInTeamDetailAtom,
    teamTagListInInvoiceAccountDetailAtom,
} from '^models/TeamInvoiceAccount/atom';
import {TEAM_INVOICE_ACCOUNT_HOOK_KEY} from '^models/TeamInvoiceAccount/hook/key';
import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {TEAM_HOOK_KEY} from '^models/Team/hook/key';

// 팀 상세 페이지 / 연결된 인보이스계정 목록 테이블
export const useTeamInvoiceAccountListInTeamDetail = () =>
    useTeamInvoiceAccount(teamInvoiceAccountListInTeamDetailAtom);

// 인보이스 계정 상세 페이지 / 연결된 팀 태그 리스트
export const useTeamTagListInInvoiceAccountDetail = () => useTeamInvoiceAccount(teamTagListInInvoiceAccountDetailAtom);

const useTeamInvoiceAccount = (
    atoms: PagedResourceAtoms<TeamInvoiceAccountDto, FindAllTeamInvoiceAccountQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => teamInvoiceAccountApi.index(orgId, params),
        getId: 'id',
        mergeMode,
    });
};

// 팀 상세p - 팀과 연결된 인보이스 계정 목록 조회
export const useTeamInvoiceAccount2 = (orgId: number, teamId: number, params: FindAllTeamInvoiceAccountQueryDto) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: [TEAM_INVOICE_ACCOUNT_HOOK_KEY.base, orgId, query, teamId],
        queryFn: () => teamInvoiceAccountApi.index(orgId, query).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId && !isNaN(orgId) && !!teamId,
    });

    return usePaginateUtils({query, setQuery, queryResult});
};

// 팀 상세p - 팀과 연결된 인보이스 계정 연결 해제
export const useDestroyTeamInvoiceAccount = (orgId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => teamInvoiceAccountApi.destroy(orgId, id).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [TEAM_INVOICE_ACCOUNT_HOOK_KEY.base], exact: false});
            queryClient.invalidateQueries({queryKey: [TEAM_HOOK_KEY.detail], exact: false, refetchType: 'all'}); // 팀상세 요약패널
        },
    });
};
