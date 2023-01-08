import {atom, selector} from 'recoil';
import {
    BillingScheduleShallowDto as ScheduleDto,
    GetBillingHistoriesParams,
    GetBillingSchedulesParams,
} from '^types/billing.type';
import {errorNotify} from '^utils/toast-notify';
import {getBillingHistories, getBillingHistory, getBillingSchedules} from '^api/billing.api';
import {billingHistoryIdParamState} from '^atoms/common';

/**
 * Billing Schedule
 */

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

export const getBillingHistoriesParamsState = atom<GetBillingHistoriesParams>({
    key: 'getBillingHistoriesParamsState',
    default: {},
});

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

export const getBillingHistoryQuery = selector({
    key: 'getBillingHistoryQuery',
    get: async ({get}) => {
        const id = get(billingHistoryIdParamState);
        if (isNaN(id)) return;
        try {
            const res = await getBillingHistory(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
    set: ({get, set}) => {},
});
