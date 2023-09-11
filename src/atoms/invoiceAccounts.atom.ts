import {atom} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {InvoiceAccountDto} from '^types/invoiceAccount.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export const getInvoiceAccountsQueryAtom = atom<FindAllQueryDto<InvoiceAccountDto>>({
    key: 'getInvoiceAccountsQueryAtom',
    default: {},
});

export const invoiceAccountsSearchResultAtom = atom<Paginated<InvoiceAccountDto>>({
    key: 'invoiceAccountsSearchResultAtom',
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
