import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {BillingHistoryDto} from '^types/billing.type';

export type InvoiceAppDto = {
    id: number;
    invoiceAccountId: number;
    prototypeId: number;
    isActive: boolean;
    billingHistories: BillingHistoryDto[];
    prototype: ApplicationPrototypeDto;
};
