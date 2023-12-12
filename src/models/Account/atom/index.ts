import {atom, selector} from 'recoil';
import {AccountDto, FindAllAccountsQueryDto} from '^models/Account/types';
import {Paginated} from '^types/utils/paginated.dto';
import {orgIdParamState} from '^atoms/common';
import {accountApi} from '^models/Account/api';
import {subjectProductOfAccountsInModalState} from '^v3/share/modals/AccountListModal/atom';
import {subscriptionApi} from '^models/Subscription/api';
import {errorNotify} from '^utils/toast-notify';
import {ProductDto} from '^models/Product/type';

export const getAccountsQueryAtom = atom<FindAllAccountsQueryDto>({
    key: 'getAccountsQueryAtom',
    default: {},
});
export const accountsSearchResultAtom = atom<Paginated<AccountDto>>({
    key: 'accountsSearchResult',
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

export const accountListAtom = atom<AccountDto[]>({
    key: 'accountList',
    default: [],
});

// const getAccountsQueryTrigger = atom<number>({
//     key: 'getAccountsQueryTrigger',
//     default: 1,
// });

// export const getAccountsQuery = selector({
//     key: 'getAccountsQuery',
//     get: async ({get}) => {
//         const orgId = get(orgIdParamState);
//         if (!orgId) return;
//
//         get(getAccountsQueryTrigger);
//         const product = get(subjectProductOfAccountsInModalState);
//
//         const where: FindAllAccountsQueryDto['where'] = {};
//         if (product) {
//             where.productId = product.id;
//         }
//
//         try {
//             return accountApi
//                 .index(orgId, {
//                     relations: ['product'],
//                     where,
//                     itemsPerPage: 0,
//                     order: {id: 'DESC'},
//                 })
//                 .then((res) => res.data);
//         } catch (e) {
//             errorNotify(e);
//         }
//     },
//     set: ({set}) => {
//         set(getAccountsQueryTrigger, (v) => v + 1);
//     },
// });
