import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {FindAllTeamInvoiceAccountQueryDto, TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';
import {teamInvoiceAccountApi} from '^models/TeamInvoiceAccount/api';
import {teamInvoiceAccountListInTeamDetailAtom} from '^models/TeamInvoiceAccount/atom';

// 팀 상세 페이지 / 연결된 인보이스계정 목록 테이블
export const useTeamInvoiceAccountListInTeamDetail = () =>
    useTeamInvoiceAccount(teamInvoiceAccountListInTeamDetailAtom);

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
