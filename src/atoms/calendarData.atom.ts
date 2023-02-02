import {atom, selector} from 'recoil';
import {DashboardDaySumDto, DashboardSummaryDto} from '^types/dashboard.type';
import {getDashboardCalendar, getDashboardSummary} from '^api/dashboard.api';
import {errorNotify} from '^utils/toast-notify';

/**
 * Calendar
 * - calendarParamsState
 * - calendarDataAtom
 * - calendarSelectedDateState
 * - getDashboardCalendarQuery
 */

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

export const calendarSelectedDateState = atom({
    key: 'calendarSelectedDateState',
    default: new Date(),
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

/**
 * Dashboard Summary
 * - dashboardSummaryState
 * - getDashboardSummaryQuery
 */

export const dashboardSummaryState = atom({
    key: 'dashboardSummaryState',
    default: {} as DashboardSummaryDto,
});

export const getDashboardSummaryQuery = selector({
    key: 'getDashboardSummary',
    get: async ({get}) => {
        const {year, month} = get(calendarParamsState);
        console.log(1, {year, month});
        try {
            const res = await getDashboardSummary(year, month);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});
