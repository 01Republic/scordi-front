import {InvoiceAppDto} from '^types/invoiceApp.type';
import {GmailQueryOptions} from '^api/tasting.api';
import {dayAfter, firstDayOfYear, yearBefore} from '^components/util/date';

export type GmailAgentTokenData = {
    accessToken: string; //Gmail Access Token
    refreshToken: string; // Gmail Refresh Token
    expireAt: number; // Gmail Token expire at (Timestamp - sec)
};

export type InvoiceAccountDto = {
    id: number;
    organizationId: number;
    image: string | null;
    email: string;
    invoiceApps: InvoiceAppDto[];
    createAt: string;
    updateAt: string;
};

export type CreateInvoiceAccountRequestDto = {
    email: string; // 이메일
    image?: string | null; // 프로필 이미지
    // provider?: MailProvider = MailProvider.Google;
    tokenData: GmailAgentTokenData; // 인증 토큰
    gmailQueryOptions: GmailQueryOptions; // 지메일 쿼리
};

export const getDraftInvoiceAccountFromTo = () => ({
    from: firstDayOfYear(), // 올 해 1월 1일 부터
    to: new Date(), // 오늘까지
});

export const getCreateInvoiceAccountFromTo = () => ({
    from: yearBefore(1, firstDayOfYear()), // 작년 1월 1일 부터
    to: new Date(), // 오늘까지
});
