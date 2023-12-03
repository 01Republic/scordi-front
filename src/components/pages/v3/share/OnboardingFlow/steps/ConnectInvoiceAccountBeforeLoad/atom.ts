import {atom} from 'recoil';

export const connectInvoiceAccountCodeAtom = atom<string>({
    key: 'connectInvoiceAccountCodeAtom',
    default: '',
});
