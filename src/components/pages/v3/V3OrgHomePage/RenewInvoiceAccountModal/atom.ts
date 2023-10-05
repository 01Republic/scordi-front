import {atom} from 'recoil';
import {InvoiceAccountDto} from '^types/invoiceAccount.type';

export const renewInvoiceAccountModal = {
    isShowAtom: atom({
        key: 'v3/renewInvoiceAccountModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'renewInvoiceAccountModal',
};

export const renewInvoiceAccountAtom = atom<InvoiceAccountDto | null>({
    key: 'v3/renewInvoiceAccountModal/renewInvoiceAccountAtom',
    default: null,
});
