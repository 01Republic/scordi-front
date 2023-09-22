import {atom} from 'recoil';

export const newInvoiceAccountModal = {
    isShowAtom: atom({
        key: 'v3/newInvoiceAccountModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'newInvoiceAccountModal',
};
