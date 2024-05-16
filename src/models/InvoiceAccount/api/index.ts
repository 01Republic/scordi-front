import {
    CreateInvoiceAccountRequestDto,
    CreateInvoiceAccountRequestDto2,
    InvoiceAccountDto,
    ReConnectInvoiceAccountRequestDto,
    SyncInvoiceAccountRequestDto,
} from '^models/InvoiceAccount/type';
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

    // V2

    createV2(orgId: number, data: CreateInvoiceAccountRequestDto2) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts_v2`;
        return api.post<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    draftV2(data: CreateInvoiceAccountRequestDto2) {
        const url = `/${NAMESPACE}/0/invoice_accounts_v2/draft`;
        return api.post<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    syncV2(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts_v2/${id}/sync`;
        return api.patch<InvoiceAccountDto>(url);
    },

    // InvoiceAccount Sync - TokenData를 다시 받아옵니다.
    reConnect(orgId: number, id: number, data: ReConnectInvoiceAccountRequestDto) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts_v2/${id}/re-connect`;
        return api.patch<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    // v3

    createByCode(orgId: number, data: CreateInvoiceAccountRequestDto2) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts_v3/by-code`;
        return api.post<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },
};
