import {FindAllTeamQueryDto, TeamDto} from '^models/Team/type';
import {pagedResourceAtom} from '^hooks/usePagedResource';

export const teamsListAtom = pagedResourceAtom<TeamDto, FindAllTeamQueryDto>({
    key: 'teamsListAtom',
});

export const teamsListForTeamListPageAtom = pagedResourceAtom<TeamDto, FindAllTeamQueryDto>({
    key: 'teamsListForTeamListPageAtom',
});

export const teamListForSelectOptionsAtom = pagedResourceAtom<TeamDto, FindAllTeamQueryDto>({
    key: 'teamListForSelectOptionsAtom',
});
