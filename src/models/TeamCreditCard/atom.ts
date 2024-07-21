import {pagedResourceAtom} from '^hooks/usePagedResource';
import {FindAllTeamCreditCardQueryDto, TeamCreditCardDto} from '^models/TeamCreditCard/type';

// 팀 상세 페이지 / 연결된 카드 목록 테이블
export const teamCreditCardListInTeamDetailAtom = pagedResourceAtom<TeamCreditCardDto, FindAllTeamCreditCardQueryDto>({
    key: 'teamCreditCardListInTeamDetailAtom',
});
