import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {teamApi} from '^models/Team/api';
import {teamsListAtom} from '^models/Team/atom';
import {FindAllTeamQueryDto, TeamDto} from '^models/Team/type';

export const useTeamsV2 = () => useTeams(teamsListAtom);

const useTeams = (atoms: PagedResourceAtoms<TeamDto, FindAllTeamQueryDto>, mergeMode = false) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => teamApi.index(orgId, params),
        getId: 'id',
    });
};
