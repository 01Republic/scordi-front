import {FindAllInvoiceAccountQueryDto, InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {pagedResourceAtom} from '^hooks/usePagedResource';

export const invoiceAccountListAtom = pagedResourceAtom<InvoiceAccountDto, FindAllInvoiceAccountQueryDto>({
    key: 'invoiceAccountListAtom',
});
