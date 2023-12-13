import {atom} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllSubscriptionsQuery, SubscriptionDto} from '^models/Subscription/types';

/**
 * Desktop / SummarySection 만을 위한 전용 쿼리 및 조회 결과를 저장합니다.
 */
export const subscriptionsForSummaryState = {
    searchResultAtom: atom<Paginated<SubscriptionDto>>({
        key: 'subscriptionsForSummaryState/searchResultAtom',
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
    }),
    queryAtom: atom<FindAllSubscriptionsQuery>({
        key: 'subscriptionsForSummaryState/queryAtom',
        default: {},
    }),
};
