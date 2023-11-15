import {atom, selector} from 'recoil';
import {errorNotify} from '^utils/toast-notify';
import {getBillingSchedules} from '^models/BillingSchedule/api';
import {Paginated} from '^types/utils/paginated.dto';
import {BillingScheduleShallowDto as ScheduleDto, GetBillingSchedulesParams} from '^models/BillingSchedule/type';

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

// useBillingSchedulesV3 에서 사용되는 Query State
export const orgBillingSchedulesQueryV3Atom = atom<GetBillingSchedulesParams>({
    key: 'orgBillingSchedulesQueryV3Atom',
    default: {},
});

// useBillingSchedulesV3 에서 사용되는 Result State
export const orgBillingSchedulesResultV3Atom = atom<Paginated<ScheduleDto>>({
    key: 'orgBillingSchedulesResultV3Atom',
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

/**
 * Utils
 */

const sortByBillingDate = (direct: 'ASC' | 'DESC') => (a: ScheduleDto, b: ScheduleDto) => {
    const diff = new Date(a.billingDate).getTime() - new Date(b.billingDate).getTime();
    return direct === 'ASC' ? diff : diff * -1;
};

export const willPayAppsState = selector({
    key: 'willPayAppsState',
    get: ({get}) => {
        const result = get(getBillingSchedulesQuery);
        return result ? result.items.filter((d) => !d.isDead).sort(sortByBillingDate('DESC')) : [];
    },
});

export const didPayAppsState = selector({
    key: 'didPayAppsState',
    get: ({get}) => {
        const result = get(getBillingSchedulesQuery);
        return result ? result.items.filter((d) => d.isDead).sort(sortByBillingDate('DESC')) : [];
    },
});
