import {atom} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {InvoiceAccountDto} from '^types/invoiceAccount.type';

export const orgInvoiceAccountsSearchResultAtom = atom<Paginated<InvoiceAccountDto>>({
    key: 'org/InvoiceAccount/Index/Atom',
    default: {
        items: [],
        pagination: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 1,
            currentPage: 1,
            itemsPerPage: 30,
        },
    },
});
