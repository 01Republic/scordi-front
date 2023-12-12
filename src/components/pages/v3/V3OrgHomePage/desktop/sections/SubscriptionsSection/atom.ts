import {atom} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {SubscriptionDto} from '^models/Subscription/types';

export const dashboardSubscriptionSearchResultAtom = atom<Paginated<SubscriptionDto>>({
    key: 'dashboard/SubscriptionSearchResultAtom',
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
