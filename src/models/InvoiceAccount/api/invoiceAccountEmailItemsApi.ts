import {api} from '^api/api';
import {paginatedDtoOf} from '^types/utils/response-of';
import {FindAllGmailItemQueryDto, GmailItemDto} from '../type';

// [인보이스 계정] 저장된 이메일 API
export const invoiceAccountEmailItemsApi = {
    // 이메일 목록
    index(invoiceAccountId: number, params: FindAllGmailItemQueryDto) {
        const url = `/invoice_accounts/${invoiceAccountId}/email_items`;
        return api.get(url, {params}).then(paginatedDtoOf(GmailItemDto));
    },

    // 이메일 상세
    show(invoiceAccountId: number, mailId: string) {
        const url = `/invoice_accounts/${invoiceAccountId}/email_items`;
    },

    // 이메일 수정
    update(invoiceAccountId: number, mailId: string) {
        const url = `/invoice_accounts/${invoiceAccountId}/email_items`;
    },

    // 이메일 삭제
    destroy(invoiceAccountId: number, mailId: string) {
        const url = `/invoice_accounts/${invoiceAccountId}/email_items`;
    },
};
