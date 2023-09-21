import {atom} from 'recoil';
import {AccountDto, FindAllAccountsQueryDto} from '^types/account.type';
import {Paginated} from '^types/utils/paginated.dto';

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
