import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {BillingHistoryDto} from '^types/billing.type';

export type InvoiceAppDto = {
    id: number;
    invoiceAccountId: number;
    prototypeId: number;
    isActive: boolean;
    createdAt: string; // 생성일시
    updatedAt: string; // 수정일시
    billingHistories: BillingHistoryDto[];
    prototype: ApplicationPrototypeDto;
};
