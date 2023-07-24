import {api} from '^api/api';
import {InvoiceAppDto, UpdateInvoiceAppRequestDto} from '^types/invoiceApp.type';

export const invoiceAppApi = {
    update(orgId: number, id: number, data: UpdateInvoiceAppRequestDto) {
        const url = `organizations/${orgId}/invoice_apps/${id}`;
        return api.patch<InvoiceAppDto>(url, data);
    },
};
