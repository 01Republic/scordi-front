import {InvoiceAppDto} from '^types/invoiceApp.type';

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
};
