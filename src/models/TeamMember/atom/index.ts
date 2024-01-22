import {atom} from 'recoil';
import {FindAllTeamMemberQueryDto, TeamMemberDto} from '^models/TeamMember/type';
import {pagedResourceAtom} from '^hooks/usePagedResource';

export const currentTeamMemberState = atom<TeamMemberDto | null>({
    key: 'currentTeamMember',
    default: null,
});

export const teamMemberLoadingState = atom<boolean>({
    key: 'teamMemberLoadingState',
    default: false,
});

export const teamMembersAtom = atom<TeamMemberDto[]>({
    key: 'teamMembersAtom',
    default: [],
});

export const teamMemberListAtom = pagedResourceAtom<TeamMemberDto, FindAllTeamMemberQueryDto>({
    key: 'teamMemberListAtom',
});

// 대시보드 / 멤버 목록
export const teamMemberListInDashboardAtom = pagedResourceAtom<TeamMemberDto, FindAllTeamMemberQueryDto>({
    key: 'teamMemberListInDashboardAtom',
});

// 멤버관리 / 멤버 목록 테이블
export const teamMemberListInTeamMembersTableAtom = pagedResourceAtom<TeamMemberDto, FindAllTeamMemberQueryDto>({
    key: 'teamMemberListInTeamMembersTableAtom',
});

// 구독상세모달 / 이용중인 멤버 목록
export const teamMemberListInSubscriptionShowModalAtom = pagedResourceAtom<TeamMemberDto, FindAllTeamMemberQueryDto>({
    key: 'teamMemberListInSubscriptionShowModalAtom',
});
