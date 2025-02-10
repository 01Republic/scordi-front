import {atom} from 'recoil';
import {FindAllTeamQueryDto, TeamDto} from '^models/Team/type';
import {pagedResourceAtom} from '^hooks/usePagedResource';
import {makeIsLoadingAtom} from '^hooks/useResource/useIsLoading';
import {FindAllSubscriptionSeatQueryDto, SubscriptionSeatDto} from '^models/SubscriptionSeat/type';

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

export const teamMemberSubscriptionListAtom = pagedResourceAtom<SubscriptionSeatDto, FindAllSubscriptionSeatQueryDto>({
    key: 'teamMemberSubscriptionListAtom',
});

export const currentTeamAtom = atom<TeamDto | undefined>({
    key: 'currentTeamAtom',
    default: undefined,
});

export const isCurrentTeamLoadingAtom = makeIsLoadingAtom('isCurrentTeamLoadingAtom');
