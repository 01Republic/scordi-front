import {pagedResourceAtom} from '^hooks/usePagedResource';
import {FindAllTeamMembershipQueryDto, TeamMembershipDto} from '^models/TeamMembership/type';

// 팀 상세 페이지 / 연결된 멤버 목록 테이블
export const teamMembershipListInTeamDetailAtom = pagedResourceAtom<TeamMembershipDto, FindAllTeamMembershipQueryDto>({
    key: 'teamMembershipListInTeamDetailAtom',
});
