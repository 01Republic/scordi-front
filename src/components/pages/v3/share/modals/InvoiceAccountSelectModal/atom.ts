import {atom} from 'recoil';
import {FindAllInvoiceAccountQueryDto, InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {pagedResourceAtom} from '^hooks/usePagedResource';

export const invoiceAccountSelectModalAtom = {
    isShowAtom: atom({
        key: 'invoiceAccountSelectModalAtom/isShowAtom',
        default: false,
    }),
};

export const invoiceAccountsInSelectModal = pagedResourceAtom<InvoiceAccountDto, FindAllInvoiceAccountQueryDto>({
    key: 'invoiceAccountsInSelectModal',
});
