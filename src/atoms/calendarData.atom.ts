import {atom, selector} from 'recoil';
import {DashboardDaySumDto} from '^types/dashboard.type';
import {getDashboardCalendar, getDashboardSummary} from '^api/dashboard.api';
import {errorNotify} from '^utils/toast-notify';

export const calendarParamsState = atom({
    key: 'calendarParamsState',
    default: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    },
});

export const calendarDataAtom = atom({
    key: '@dashboard/calendarData',
    default: [] as DashboardDaySumDto[],
});

export const getDashboardCalendarQuery = selector({
    key: 'getDashboardCalendarQuery',
    get: async ({get}) => {
        const {year, month} = get(calendarParamsState);
        try {
            const res = await getDashboardCalendar(year, month);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});

export const getDashboardSummaryQuery = selector({
    key: 'getDashboardSummary',
    get: async ({get}) => {
        const {year, month} = get(calendarParamsState);
        try {
            const res = await getDashboardSummary(year, month);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});
