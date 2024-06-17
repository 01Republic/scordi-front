import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {teamApi} from '^models/Team/api';
import {teamListForSelectOptionsAtom, teamsListAtom} from '^models/Team/atom';
import {FindAllTeamQueryDto, TeamDto} from '^models/Team/type';

export const useTeamsV2 = () => useTeams(teamsListAtom);
export const useTeamsForSelectOptions = () => useTeams(teamListForSelectOptionsAtom);

const useTeams = (atoms: PagedResourceAtoms<TeamDto, FindAllTeamQueryDto>, mergeMode = false) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => teamApi.index(orgId, params),
        getId: 'id',
    });
};
