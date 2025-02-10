import {atom} from 'recoil';
import {FindAllTeamMemberQueryDto, TeamMemberDto} from '^models/TeamMember/type';
import {pagedResourceAtom} from '^hooks/usePagedResource';
import {FindAllSubscriptionSeatQueryDto, SubscriptionSeatDto} from '^models/SubscriptionSeat/type';

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

// 조직설정 / 청구수신계정 멤버 조회
export const paymentReceiveTeamMemberForOrgSettingAtom = pagedResourceAtom<TeamMemberDto, FindAllTeamMemberQueryDto>({
    key: 'paymentReceiveTeamMemberForOrgSettingAtom',
});

// 구독 수동 등록 / 멤버 목록
export const teamMemberListInCreateSubscriptionAtom = pagedResourceAtom<TeamMemberDto, FindAllTeamMemberQueryDto>({
    key: 'teamMemberListInCreateSubscriptionAtom',
});

// 구독 수동 등록 / 담당자 선택용 멤버 목록
export const teamMemberListForMasterSelectInCreateSubscriptionAtom = pagedResourceAtom<
    TeamMemberDto,
    FindAllTeamMemberQueryDto
>({
    key: 'teamMemberListForMasterSelectInCreateSubscriptionAtom',
});

// 팀 상세 / 멤버추가모달 / 추가할 수 있는 멤버목록
export const addableTeamMemberListInAddTeamMemberModal = pagedResourceAtom<TeamMemberDto, FindAllTeamMemberQueryDto>({
    key: 'addableTeamMemberListInAddTeamMemberModal',
});

// 구독 상세 / 팀멤버 탭
export const subscriptionSeatsInSubscriptionDetailTeamMemberTabAtom = pagedResourceAtom<
    SubscriptionSeatDto,
    FindAllSubscriptionSeatQueryDto
>({
    key: 'subscriptionSeatsInSubscriptionDetailTeamMemberTabAtom',
});
