import {
    CreateInvoiceAccountRequestDto,
    InvoiceAccountDto,
    SyncInvoiceAccountRequestDto,
} from '^types/invoiceAccount.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

export const getInvoiceAccounts = (organizationId: number, params?: FindAllQueryDto<InvoiceAccountDto>) => {
    return api
        .get<Paginated<InvoiceAccountDto>>(`/organizations/${organizationId}/invoice_accounts`, {params})
        .then(paginatedDtoOf(InvoiceAccountDto));
};

export const draftInvoiceAccount = (data: CreateInvoiceAccountRequestDto) => {
    return api
        .post<InvoiceAccountDto>(`/organizations/0/invoice_accounts/draft`, data)
        .then(oneDtoOf(InvoiceAccountDto));
};

export const createInvoiceAccount = (organizationId: number, data: CreateInvoiceAccountRequestDto) => {
    return api
        .post<InvoiceAccountDto>(`/organizations/${organizationId}/invoice_accounts`, data)
        .then(oneDtoOf(InvoiceAccountDto));
};

export const deleteInvoiceAccount = (organizationId: number, id: number) => {
    return api.delete(`/organizations/${organizationId}/invoice_accounts/${id}`);
};

export const syncInvoiceAccount = (organizationId: number, id: number) => {
    return api.patch<InvoiceAccountDto>(`/organizations/${organizationId}/invoice_accounts/${id}/sync`);
};

export const renewInvoiceAccount = (organizationId: number, id: number, data: SyncInvoiceAccountRequestDto) => {
    return api.patch<InvoiceAccountDto>(`/organizations/${organizationId}/invoice_accounts/${id}/re-sync`, data);
};

export const invoiceAccountApi = {
    index(orgId: number, params?: FindAllQueryDto<InvoiceAccountDto>) {
        const url = `/organizations/${orgId}/invoice_accounts`;
        return api.get<Paginated<InvoiceAccountDto>>(url, {params}).then(paginatedDtoOf(InvoiceAccountDto));
    },

    show(orgId: number, id: number) {
        const url = `/organizations/${orgId}/invoice_accounts/${id}`;
        return api.get<InvoiceAccountDto>(url).then(oneDtoOf(InvoiceAccountDto));
    },

    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/invoice_accounts/${id}`;
        return api.delete<InvoiceAccountDto>(url).then(oneDtoOf(InvoiceAccountDto));
    },
};
