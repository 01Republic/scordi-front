import {
    CreateInvoiceAccountRequestDto,
    InvoiceAccountDto,
    SyncInvoiceAccountRequestDto,
} from '^types/invoiceAccount.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

const NAMESPACE = 'organizations';

export const invoiceAccountApi = {
    index(orgId: number, params?: FindAllQueryDto<InvoiceAccountDto>) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts`;
        return api.get<Paginated<InvoiceAccountDto>>(url, {params}).then(paginatedDtoOf(InvoiceAccountDto));
    },

    show(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts/${id}`;
        return api.get<InvoiceAccountDto>(url).then(oneDtoOf(InvoiceAccountDto));
    },

    create(orgId: number, data: CreateInvoiceAccountRequestDto) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts`;
        return api.post<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    destroy(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts/${id}`;
        return api.delete<InvoiceAccountDto>(url).then(oneDtoOf(InvoiceAccountDto));
    },

    draft(data: CreateInvoiceAccountRequestDto) {
        const url = `/${NAMESPACE}/0/invoice_accounts/draft`;
        return api.post<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    sync(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts/${id}/sync`;
        return api.patch<InvoiceAccountDto>(url);
    },

    renew(orgId: number, id: number, data: SyncInvoiceAccountRequestDto) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts/${id}/re-sync`;
        return api.patch<InvoiceAccountDto>(url, data);
    },
};
