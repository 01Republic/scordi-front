import {atom} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {SubscriptionDto} from '^models/Subscription/types';

export const subscriptionSelectModalAtom = {
    isShowAtom: atom({
        key: 'SubscriptionSelectModal/isShowAtom',
        default: false,
    }),
};

export const pagesResultAtom = atom<Paginated<SubscriptionDto>>({
    key: 'SubscriptionSelectModal/paged/result',
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

export const noSelectableIdsAtom = atom<number[]>({
    key: 'SubscriptionSelectModal/noSelectableIds',
    default: [],
});

// export const subscriptionSelectModalPreferenceAtom = atom({
//     key: 'subscriptionSelectModalPreferenceAtom',
//     default: {
//         title: '',
//     },
// });
