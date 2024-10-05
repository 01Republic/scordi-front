import {pagedResourceAtom} from '^hooks/usePagedResource';
import {FindAllTeamInvoiceAccountQueryDto, TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';

// 팀 상세 페이지 / 연결된 인보이스계정 목록 테이블
export const teamInvoiceAccountListInTeamDetailAtom = pagedResourceAtom<
    TeamInvoiceAccountDto,
    FindAllTeamInvoiceAccountQueryDto
>({
    key: 'teamInvoiceAccountListInTeamDetailAtom',
});

// 인보이스 계정 상세 페이지 / 연결된 팀 태그 리스트
export const teamTagListInInvoiceAccountDetailAtom = pagedResourceAtom<
    TeamInvoiceAccountDto,
    FindAllTeamInvoiceAccountQueryDto
>({
    key: 'teamTagListInInvoiceAccountDetailAtom',
});
