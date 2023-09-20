import {atom} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {AccountDto} from '^types/account.type';
import {SubscriptionDto} from '^types/subscription.type';

export const accountListModal = {
    isShowAtom: atom({
        key: 'v3/accountListModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'accountListModal',
};

interface AccountPagedInModalData {
    productId: number | null;
    subscription?: SubscriptionDto | null;
    pagedData: Paginated<AccountDto>;
}

export const accountPagedInModalState = atom<AccountPagedInModalData>({
    key: 'accountPagedInModalState',
    default: {
        productId: null,
        pagedData: {
            items: [],
            pagination: {
                totalItemCount: 0,
                currentItemCount: 0,
                totalPage: 1,
                currentPage: 1,
                itemsPerPage: 30,
            },
        },
    },
});
