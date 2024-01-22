import {FindAllTeamMemberQueryDto, teamMemberApi, TeamMemberDto} from '^models/TeamMember';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';

export const useTeamMembersV3 = (
    atoms: PagedResourceAtoms<TeamMemberDto, FindAllTeamMemberQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => teamMemberApi.index(orgId, params),
        buildQuery: (params, orgId) => {
            params.where = {organizationId: orgId, ...params.where};
            return params;
        },
        getId: 'id',
        mergeMode,
    });
};
