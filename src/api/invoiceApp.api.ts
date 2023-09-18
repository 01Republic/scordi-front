import {api} from '^api/api';
import {InvoiceAppDto, UpdateInvoiceAppRequestDto} from '^types/invoiceApp.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {Paginated} from '^types/utils/paginated.dto';

export const invoiceAppApi = {
    index(orgId: number, params?: FindAllQueryDto<InvoiceAppDto>) {
        const url = `organizations/${orgId}/invoice_apps`;
        return api.get<Paginated<InvoiceAppDto>>(url, {params});
    },

    show(orgId: number, id: number, params?: any) {
        const url = `organizations/${orgId}/invoice_apps/${id}`;
        return api.get<InvoiceAppDto>(url, {params});
    },

    update(orgId: number, id: number, data: UpdateInvoiceAppRequestDto) {
        const url = `organizations/${orgId}/invoice_apps/${id}`;
        return api.patch<InvoiceAppDto>(url, data);
    },
};
