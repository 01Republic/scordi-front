import {atom, selector} from 'recoil';
import {
    BillingHistoryDto,
    BillingScheduleShallowDto as ScheduleDto,
    GetBillingHistoriesParams,
    GetBillingSchedulesParams,
    UpdateBillingHistoryRequestDto,
} from '^types/billing.type';
import {errorNotify} from '^utils/toast-notify';
import {getBillingHistories, getBillingHistory, getBillingSchedules} from '^api/billing.api';
import {billingHistoryIdParamState} from '^atoms/common';
import {useForm} from 'react-hook-form';
import {PaginationMetaData} from '^types/utils/paginated.dto';

/**
 * Billing Schedule
 */

export const billingSchedulesState = atom({
    key: 'billingSchedulesState',
    default: [] as ScheduleDto[],
});

export const getBillingSchedulesParamsState = atom<GetBillingSchedulesParams>({
    key: 'getBillingSchedulesParamsState',
    default: {},
});

export const getBillingSchedulesQuery = selector({
    key: 'getBillingSchedulesQuery',
    get: async ({get}) => {
        const params = get(getBillingSchedulesParamsState);
        if (!params.where?.organizationId) return;

        try {
            const res = await getBillingSchedules(params);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});

const sortByBillingDate = (direct: 'ASC' | 'DESC') => (a: ScheduleDto, b: ScheduleDto) => {
    const diff = new Date(a.billingDate).getTime() - new Date(b.billingDate).getTime();
    return direct === 'ASC' ? diff : diff * -1;
};

export const willPayAppsState = selector({
    key: 'willPayAppsState',
    get: ({get}) => {
        const result = get(getBillingSchedulesQuery);
        return result ? result.items.filter((d) => !d.isSuccess).sort(sortByBillingDate('DESC')) : [];
    },
});

export const didPayAppsState = selector({
    key: 'didPayAppsState',
    get: ({get}) => {
        const result = get(getBillingSchedulesQuery);
        return result ? result.items.filter((d) => d.isSuccess).sort(sortByBillingDate('DESC')) : [];
    },
});

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
        if (!params.where?.applicationId) return;

        try {
            const res = await getBillingHistories(params);
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
            const res = await getBillingHistory(id);
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
