import {FindAllTeamQueryDto, TeamDto} from '^models/Team/type';
import {pagedResourceAtom} from '^hooks/usePagedResource';

export const teamsListAtom = pagedResourceAtom<TeamDto, FindAllTeamQueryDto>({
    key: 'teamsListAtom',
});

// 팀 목록 페이지 > 팀 목록 테이블
export const teamsListForTeamListPageAtom = pagedResourceAtom<TeamDto, FindAllTeamQueryDto>({
    key: 'teamsListForTeamListPageAtom',
});

// 팀 Select Input (mono-select) 에서 사용
export const teamListForSelectOptionsAtom = pagedResourceAtom<TeamDto, FindAllTeamQueryDto>({
    key: 'teamListForSelectOptionsAtom',
});
