import {getGoogleAccessTokenByRefreshToken, GoogleAccessTokenData} from '^api/tasting.api';
import {GmailPermittedMetadata} from '^api/tasting.api/gmail/agent/get-email-metadata';
import {ProviderNames, SenderNames} from '^api/tasting.api/gmail/agent/detect-provider-name';
import {getGoogleUserData} from '^models/User/api/session';
import {MoneyLike} from '^types/money.type';
import {BillingType} from '^models/InvoiceApp/type';
import {TypeCast} from '^types/utils/class-transformer';
import {GmailAgentTokenData} from '^models/InvoiceAccount/type';
import {FileDto} from '^api/file.api';

export class GmailParsedItem {
    id: string;
    sender: SenderNames;
    provider: ProviderNames;
    @TypeCast(() => GmailPermittedMetadata) metadata: GmailPermittedMetadata;
    title: string;
    @TypeCast(() => FileDto) content: FileDto[] | FileDto;
    @TypeCast(() => AttachmentFile) attachments: AttachmentFile[];
    @TypeCast(() => BillingInfo) billingInfo?: BillingInfo;
}

export class AttachmentFile {
    uid: string;
    fileName: string;
    url?: string;
}

export class BillingInfo {
    issuedAt: Date;
    lastRequestedAt?: Date | null;
    paidAt?: Date | null;
    paymentMethod?: string | null;
    payAmount?: MoneyLike | null;
    assumedBillingType?: BillingType | null;
    invoiceUrl?: string | null;
}

export type GmailQueryOptions = {
    from: Date; // 메일 쿼리 - 언제부터
    to: Date; // 메일 쿼리 - 언제까지
};

export class GmailAgent {
    readonly accessTokenData: GoogleAccessTokenData;

    constructor(accessTokenData: GoogleAccessTokenData) {
        this.accessTokenData = accessTokenData;
    }

    async getAccessToken() {
        const expireAt = this.accessTokenData.expireAt;
        const now = new Date();

        if (expireAt.getTime() <= now.getTime()) {
            await this.refreshAccessToken();
        }

        return this.accessTokenData.access_token;
    }

    async refreshAccessToken(): Promise<void> {
        const refreshToken = this.accessTokenData.refresh_token;
        const data = await getGoogleAccessTokenByRefreshToken(refreshToken);
        this.accessTokenData.access_token = data.access_token;
        this.accessTokenData.expires_in = data.expires_in;
        this.accessTokenData.expireAt = data.expireAt;
    }

    async getProfile() {
        const accessToken = await this.getAccessToken();
        return getGoogleUserData(accessToken).then((res) => res.data);
    }

    getGmailAgentTokenData() {
        const tokenData: GmailAgentTokenData = {
            accessToken: this.accessTokenData.access_token,
            refreshToken: this.accessTokenData.refresh_token,
            expireAt: this.accessTokenData.expireAt,
        };
        return tokenData;
    }

    // async getList(): Promise<GmailItem[]> {
    //     const accessToken = await this.getAccessToken();
    //     const lastYear = yearBefore(1);
    //
    //     // Gmail 목록 가져오기
    //     const page = await getGmailList({accessToken});
    //
    //     // Gmail 순회하며 상세 조회
    //     const emailItems = await Promise.all(
    //         page.messages.map(async (message): Promise<undefined | GmailItem> => {
    //             const email = await getGmailContent({accessToken, id: message.id});
    //             const metadata = getEmailMetadata(email);
    //             const provider = detectProviderName(email, metadata);
    //
    //             // provider 가 식별되지 않으면 무시합니다.
    //             if (!provider) return;
    //
    //             // 오늘로부터 1년 이상 지난 이메일은 무시합니다.
    //             if (lastYear.getTime() > metadata.date.getTime()) return;
    //
    //             const content = parseEmailContent(email);
    //             const attachments = parseEmailAttachments(email);
    //             const price = await parseEmailPrice(accessToken, provider, email, content, attachments);
    //
    //             return {
    //                 id: message.id,
    //                 sender: '' as SenderNames,
    //                 provider,
    //                 metadata,
    //                 title: metadata.subject,
    //                 content: content ?? [],
    //                 attachments,
    //                 price,
    //             };
    //         }),
    //     );
    //
    //     const validItems = emailItems.filter((it) => it) as GmailItem[];
    //
    //     // => return sorted email item array.
    //     return validItems.sort(dateSortBy('ASC', (item) => item.metadata.date));
    // }
}
