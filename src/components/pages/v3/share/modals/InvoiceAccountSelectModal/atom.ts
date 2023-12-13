import {atom} from 'recoil';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {FindAllInvoiceAccountQueryDto, InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {Paginated} from '^types/utils/paginated.dto';

export const invoiceAccountSelectModalAtom = {
    isShowAtom: atom({
        key: 'invoiceAccountSelectModalAtom/isShowAtom',
        default: false,
    }),
};

// export const invoiceAccountSubscriptionIdAtom = atom<number | null>({
//     key: 'invoiceAccountSubscriptionIdAtom',
//     default: null,
// });

export const getInvoiceAccountsQueryAtom = atom<FindAllInvoiceAccountQueryDto>({
    key: 'SelectModal/getInvoiceAccountsQueryAtom',
    default: {},
});

export const invoiceAccountsSearchResultAtom = atom<Paginated<InvoiceAccountDto>>({
    key: 'SelectModal/invoiceAccountsSearchResultAtom',
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
