import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {BillingHistoryDto} from '^types/billing.type';

export enum BillingType {
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
    PER_CASE = 'perCase',
    UNDEF = 'undef',
}

export type InvoiceAppDto = {
    id: number;
    invoiceAccountId: number;
    prototypeId: number;
    isActive: boolean;
    billingType: BillingType; // 결제 유형
    createdAt: string; // 생성일시
    updatedAt: string; // 수정일시
    billingHistories: BillingHistoryDto[];
    prototype: ApplicationPrototypeDto;
};
