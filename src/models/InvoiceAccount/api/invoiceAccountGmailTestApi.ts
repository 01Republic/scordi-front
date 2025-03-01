import {api} from '^api/api';
import {
    CreateBillingHistoryFromGmailItemDto,
    GetEmailOfInvoiceAccountQueryDto,
    GmailMessageListFetchParamQueryDto,
    GmailMessageListFetchResultDto,
} from '^models/InvoiceAccount/type/invoiceAccountGmailTextApi.type';
import {plainToInstance} from 'class-transformer';
import {GmailContentReadableDto} from '^models/InvoiceAccount/type/gmail.type';

/**
 * [인보이스] 인보이스 계정 이메일 테스트 API
 */
export const invoiceAccountGmailTestApi = {
    // InvoiceAccount 이메일 조회
    index(invoiceAccountId: number, params: GmailMessageListFetchParamQueryDto) {
        params.readable ??= false;
        const url = `/invoice_accounts/test/${invoiceAccountId}/emails`;
        return api.get(url, {params}).then((res) => {
            return plainToInstance(GmailMessageListFetchResultDto, res.data);
        });
    },

    // InvoiceAccount 이메일 상세
    show(invoiceAccountId: number, messageId: string, params: GetEmailOfInvoiceAccountQueryDto) {
        params.readable ??= false;
        const url = `/invoice_accounts/test/${invoiceAccountId}/emails/${messageId}`;
        return api.get(url, {params}).then((res) => {
            return plainToInstance(GmailContentReadableDto, res.data);
        });
    },

    // InvoiceAccount 이메일로 BillingHistory 생성
    createBillingHistory(invoiceAccountId: number, messageId: string, dto: CreateBillingHistoryFromGmailItemDto) {
        const url = `/invoice_accounts/test/${invoiceAccountId}/emails/${messageId}/billingHistory`;
        return api.post(url, dto);
    },
};
