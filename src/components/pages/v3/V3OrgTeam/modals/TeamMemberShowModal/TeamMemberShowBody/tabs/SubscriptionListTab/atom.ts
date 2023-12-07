import {atom} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllSubscriptionsQuery, SubscriptionDto} from '^models/Subscription/types';

export const pagedSubscriptionForTeamMemberShowModalState = atom<Paginated<SubscriptionDto>>({
    key: 'teamMemberShowModal/paged/subscriptions',
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

export const subscriptionQueryForTeamMemberShowModalState = atom<FindAllSubscriptionsQuery>({
    key: 'teamMemberShowModal/getSubscriptionListQuery',
    default: {},
});
