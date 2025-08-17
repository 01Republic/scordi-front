import {api, errorToast} from '^api/api';
import {AttachmentFile} from '^api/tasting.api';
import {TypeCast} from '^types/utils/class-transformer';
import {allFulfilled, captures} from '^utils/array';
import {OrganizationDto} from '^models/Organization/type';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {GmailContentPayloadHeader, GmailPermittedMetadata} from './gmail.type';
import {GmailItemBillingInfoDto} from './GmailItemBillingInfo.dto';
import {InvoiceAccountDto} from './index';

export class GmailItemDto {
    id: number; // ID
    organizationId: number; // 조직 FK
    invoiceAccountId: number; // 인보이스 연동 계정 FK
    billingHistoryId: number | null; // 결제내역 FK
    mailId: string; // 메일 id
    threadId: string; // 쓰레드 id
    from: string; // 보낸이
    title: string; // 제목
    snippet: string;
    sizeEstimate: number;
    historyId: string;
    internalDate: string; // 받은시각 (UNIX TS)
    @TypeCast(() => GmailPermittedMetadata) metadata: GmailPermittedMetadata;
    contentUrl: string;
    @TypeCast(() => AttachmentFile) attachments: AttachmentFile[];
    @TypeCast(() => GmailContentPayloadHeader) headers: GmailContentPayloadHeader[];

    isRelated: boolean | null; // 인보이스 관련 이메일인지 여부
    @TypeCast(() => Date) parsedAt: Date | null; // 파싱 완료 일시
    @TypeCast(() => Date) checkedAt: Date | null; // 관리자의 읽음여부
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => GmailItemBillingInfoDto) billingInfo?: GmailItemBillingInfoDto; // 지메일 인보이스 정보
    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => InvoiceAccountDto) invoiceAccount?: InvoiceAccountDto; // 인보이스 연동 계정
    @TypeCast(() => BillingHistoryDto) billingHistory?: BillingHistoryDto; // 결제내역

    // 받은시각
    get receivedAt() {
        return new Date(Number(this.internalDate));
    }

    get fromName() {
        return this.from
            .replace(/\<.+\>/, '')
            .replace(/"/g, '')
            .trim();
    }

    get fromEmail() {
        return captures(this.from, /\<(.+)\>/)[0];
    }

    content?: string;

    async loadContent() {
        return GmailItemDto.loadContent(this.contentUrl);
    }

    static async loadContent(contentUrl?: string): Promise<string> {
        if (!contentUrl) return '';
        const url = encodeURIComponent(contentUrl);
        return api
            .get('/proxy', {params: {url}})
            .then((res) => res.data || '')
            .catch(errorToast);
    }
}

export type FetchedAttachmentFile = {file: AttachmentFile; data?: string};

export async function fetchAttachmentFiles(files: AttachmentFile[]): Promise<FetchedAttachmentFile[]> {
    return allFulfilled(
        files.map(async (file) => {
            if (!file.url) {
                return {file, data: undefined};
            } else {
                const url = encodeURIComponent(file.url);
                return api.get('/proxy-get-text', {params: {url}}).then(({data}) => {
                    // new Blob([data], { type: 'application/pdf', encoding: 'UTF-8' });
                    return {file, data: data?.content || ''};
                });
            }
        }),
    );
}
