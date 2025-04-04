import {atom, selector} from 'recoil';
import {DashboardDaySumDto, DashboardSummaryDto, SummaryOfBillingHistoriesDto} from '^types/dashboard.type';
import {getDashboardCalendar, getDashboardSummary} from '^api/dashboard.api';
import {errorNotify} from '^utils/toast-notify';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';

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

export const calendarActiveStartDateAtom = atom({
    key: 'calendarActiveStartDateAtom',
    default: new Date(),
});

export const calendarSelectedDateState = atom<Date | null>({
    key: 'calendarSelectedDateState',
    default: null,
});

export const getDashboardCalendarQuery = selector({
    key: 'getDashboardCalendarQuery',
    get: async ({get}) => {
        const {year, month} = get(calendarParamsState);
        const organizationId = useRouterIdParamState('id', orgIdParamState);

        try {
            const res = await getDashboardCalendar(organizationId, year, month);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});

/**
 * OrgDashboardPage Summary
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
        const organizationId = useRouterIdParamState('id', orgIdParamState);

        try {
            const res = await getDashboardSummary(organizationId, year, month);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});

/**
 * V3 OrgDashboardPage
 */

export const dashboardSummaryV3State = atom<SummaryOfBillingHistoriesDto | null>({
    key: 'dashboardSummaryV3State',
    default: null,
});
