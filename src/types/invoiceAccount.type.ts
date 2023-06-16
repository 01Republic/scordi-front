import {InvoiceAppDto} from '^types/invoiceApp.type';

export type InvoiceAccountDto = {
    id: number;
    organizationId: number;
    image: string | null;
    email: string;
    invoiceApps: InvoiceAppDto[];
    createAt: string;
    updateAt: string;
};
