import {atom, selector} from 'recoil';
import {errorNotify} from '^utils/toast-notify';
import {billingHistoryIdParamState} from '^atoms/common';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {Paginated} from '^types/utils/paginated.dto';
import {BillingHistoryDto, GetBillingHistoriesParams} from '^models/BillingHistory/type';

/**
 * Billing History
 */

export const billingHistoriesState = atom<BillingHistoryDto[]>({
    key: 'billingHistoriesState',
    default: [],
});

export const getBillingHistoriesParamsState = atom<GetBillingHistoriesParams>({
    key: 'getBillingHistoriesParamsState',
    default: {},
});

// export const billingHistoryListPaginationAtom = atom<PaginationMetaData>({
//     key: 'billingHistoryList/paginationAtom',
//     default: {
//         totalItemCount: 0,
//         currentItemCount: 0,
//         totalPage: 0,
//         currentPage: 0,
//         itemsPerPage: 15,
//     },
// });

export const getBillingHistoriesQuery = selector({
    key: 'getBillingHistoriesQuery',
    get: async ({get}) => {
        const params = get(getBillingHistoriesParamsState);
        if (!params.where?.subscriptionId) return;

        try {
            const res = await billingHistoryApi.index(params);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});

/**
 * BillingHistoryQuery 를 페이지 컨텍스트내의 의존성과 별개로 강제로 재실행(re-fetch) 할 수 있도록 만들어줍니다.
 * https://skyblue300a.tistory.com/10
 */
export const getBillingHistoryQueryTrigger = atom({
    key: 'getBillingHistoryQueryTrigger',
    default: 0,
});

export const getBillingHistoryQuery = selector({
    key: 'getBillingHistoryQuery',
    get: async ({get}) => {
        // 트리거의 상태를 구독해서 트리거 값이 변경될 때마다 api call
        get(getBillingHistoryQueryTrigger);
        const id = get(billingHistoryIdParamState);
        if (isNaN(id)) return;
        try {
            const res = await billingHistoryApi.show(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
    set: ({get, set}) => {
        // setter 가 호출되면 트리거의 값을 1만큼 증가
        // => 트리거 값 변경으로 인해 api call
        set(getBillingHistoryQueryTrigger, (v) => v + 1);
    },
});

// useBillingHistoriesV3 에서 사용되는 Query State
export const orgBillingHistoriesQueryV3Atom = atom<GetBillingHistoriesParams>({
    key: 'orgBillingHistoriesQueryV3Atom',
    default: {},
});

// useBillingHistoriesV3 에서 사용되는 Result State
export const orgBillingHistoriesResultV3Atom = atom<Paginated<BillingHistoryDto>>({
    key: 'orgBillingHistoriesResultV3Atom',
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
