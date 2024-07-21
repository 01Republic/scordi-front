import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {FindAllTeamMembershipQueryDto, TeamMembershipDto} from '^models/TeamMembership/type';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {teamMembershipListInTeamDetailAtom} from '^models/TeamMembership/atom';

// 팀 상세 페이지 / 연결된 멤버 목록 테이블
export const useTeamMembershipListInTeamDetail = () => useTeamMembership(teamMembershipListInTeamDetailAtom);

const useTeamMembership = (
    atoms: PagedResourceAtoms<TeamMembershipDto, FindAllTeamMembershipQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => teamMembershipApi.index(orgId, params),
        getId: 'id',
        mergeMode,
    });
};
