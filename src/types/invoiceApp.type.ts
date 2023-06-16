import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';

export type InvoiceAppDto = {
    id: number;
    invoiceAccountId: number;
    prototypeId: number;
    isActive: boolean;
    prototype: ApplicationPrototypeDto;
};
