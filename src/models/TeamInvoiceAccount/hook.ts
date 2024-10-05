import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {FindAllTeamInvoiceAccountQueryDto, TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';
import {teamInvoiceAccountApi} from '^models/TeamInvoiceAccount/api';
import {
    teamInvoiceAccountListInTeamDetailAtom,
    teamTagListInInvoiceAccountDetailAtom,
} from '^models/TeamInvoiceAccount/atom';

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
