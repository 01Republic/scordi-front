import {FindAllTeamQueryDto, TeamDto} from '^models/Team/type';
import {pagedResourceAtom} from '^hooks/usePagedResource';

export const teamsListAtom = pagedResourceAtom<TeamDto, FindAllTeamQueryDto>({
    key: 'teamsListAtom',
});
