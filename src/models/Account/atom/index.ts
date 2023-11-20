import {atom, selector} from 'recoil';
import {AccountDto, FindAllAccountsQueryDto} from '^models/Account/types';
import {Paginated} from '^types/utils/paginated.dto';
import {orgIdParamState} from '^atoms/common';
import {accountApi} from '^models/Account/api';
import {subjectProductOfAccountsInModalState} from '^v3/share/modals/AccountListModal/atom';
import {subscriptionApi} from '^models/Subscription/api';
import {errorNotify} from '^utils/toast-notify';

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

export const getAccountsQuery = selector({
    key: 'getAccountsQuery',
    get: async ({get}) => {
        const orgId = get(orgIdParamState);
        if (!orgId) return;

        get(subjectProductOfAccountsInModalState);

        try {
            const res = await accountApi
                .index(orgId, {relations: ['product'], itemsPerPage: 0})
                .then((res) => res.data);

            return res;
        } catch (e) {
            errorNotify(e);
        }
    },
});
