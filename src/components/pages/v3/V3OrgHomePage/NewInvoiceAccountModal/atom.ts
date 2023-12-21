import {atom} from 'recoil';

export const newInvoiceAccountModal = {
    isShowAtom: atom({
        key: 'v3/newInvoiceAccountModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'newInvoiceAccountModal',
};

export enum ConnectInvoiceAccount {
    ConnectInvoiceAccount_BeforeLoad,
    ConnectInvoiceAccount_IsLoading,
    ConnectInvoiceAccount_AfterLoad,
}

export const InvoiceAccount = {
    beforeLoad: ConnectInvoiceAccount.ConnectInvoiceAccount_BeforeLoad,
    isLoading: ConnectInvoiceAccount.ConnectInvoiceAccount_IsLoading,
    afterLoad: ConnectInvoiceAccount.ConnectInvoiceAccount_AfterLoad,
};

export const connectInvoiceAccountStatus = atom<ConnectInvoiceAccount>({
    key: 'connectInvoiceAccountStatus',
    default: ConnectInvoiceAccount.ConnectInvoiceAccount_BeforeLoad,
});

export const connectInvoiceAccountCodeAtom = atom<string | null>({
    key: 'connectInvoiceAccountCodeAtom',
    default: null,
});
