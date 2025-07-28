import {GmailQueryOptions} from '^api/tasting.api';
import {GmailAgentTokenData} from './GmailAgentTokenData.type';
import {InvoiceAccountUsingStatus} from './InvoiceAccountUsingStatus.enum';

export class CreateInvoiceAccountRequestDto {
    email: string; // 이메일
    image?: string | null; // 프로필 이미지
    // provider?: MailProvider = MailProvider.Google;
    tokenData: GmailAgentTokenData; // 인증 토큰
    gmailQueryOptions: GmailQueryOptions; // 지메일 쿼리
}

export class CreateInvoiceAccountDto {
    email: string;
    holdingMemberId?: number | null;
    memo?: string | null; // 메모
    usingStatus?: InvoiceAccountUsingStatus; // 사용상태
}

export class CreateInvoiceAccountRequestDto2 {
    code: string; // 구글 1회성 코드
    gmailQueryOptions: GmailQueryOptions; // 지메일 쿼리
}
