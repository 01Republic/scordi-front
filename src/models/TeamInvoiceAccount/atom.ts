import {pagedResourceAtom} from '^hooks/usePagedResource';
import {FindAllTeamInvoiceAccountQueryDto, TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';

// 팀 상세 페이지 / 연결된 인보이스계정 목록 테이블
export const teamInvoiceAccountListInTeamDetailAtom = pagedResourceAtom<
    TeamInvoiceAccountDto,
    FindAllTeamInvoiceAccountQueryDto
>({
    key: 'teamInvoiceAccountListInTeamDetailAtom',
});
