import {useRouter} from 'next/router';
import {useCallback, useEffect, useMemo} from 'react';
import {atom, SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
    calendarActiveStartDateAtom,
    calendarDataAtom,
    calendarParamsState,
    calendarSelectedDateState,
    getDashboardCalendarQuery,
} from '^atoms/calendarData.atom';
import {getDashboardCalendar, getDashboardCalendarV2} from '^api/dashboard.api';
import {errorNotify} from '^utils/toast-notify';
import {getQueryParams} from '^utils/get-query-params';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {FromToQueryDto} from '^types/billing.type';
import {focusedMonthAtom, useFocusedMonth} from '^v3/V3OrgHomePage/feature/useFocusedMonth';
import {getBillingHistories} from '^api/billing.api';
import {firstDayOfMonth, lastDayOfMonth, monthAfter, monthBefore} from '^utils/dateTime';

export function useCalendar() {
    const {query} = useRouter();
    const y = Number(query.y);
    const m = Number(query.m);
    const calendarData = useRecoilValue(getDashboardCalendarQuery);
    const [{year, month}, setCalendarParams] = useRecoilState(calendarParamsState);

    useEffect(() => {
        if (isNaN(y) || isNaN(m)) return;
        setCalendarParams({year: y, month: m});
    }, [y, m]);

    return {
        year,
        month,
        calendarData,
    };
}

// on desktop
// 화면 깜빡임 문제가 발생해서 좀 더 경량화 함.
export function useCalendar2() {
    const today = new Date();
    const queryParams = getQueryParams<{y: string; m: string}>(['y', 'm']);
    const year = parseInt(`${queryParams.y || today.getFullYear()}`);
    const month = parseInt(`${queryParams.m || today.getMonth() + 1}`);
    const [calendarData, setCalendarData] = useRecoilState(calendarDataAtom);
    const selectDate = useSetRecoilState(calendarSelectedDateState);
    const organizationId = useRouterIdParamState('id', orgIdParamState);

    const setCalendar = useCallback((organizationId: number, y: number, m: number) => {
        getDashboardCalendar(organizationId, y, m)
            .then((res) => setCalendarData(res.data))
            .catch(errorNotify);
    }, []);

    useEffect(() => {
        if (!isNaN(year) && !isNaN(month)) setCalendar(organizationId, year, month);
    }, [year, month]);

    return {calendarData, setCalendar, year, month, selectDate};
}

export function useCalendar3() {
    const [selectedDate, selectDate] = useRecoilState(calendarSelectedDateState);
    const [activeStartDate, setActiveStartDate] = useRecoilState(calendarActiveStartDateAtom);

    return {
        selectedDate: selectedDate || new Date(),
        selectDate,
        activeStartDate,
        setActiveStartDate,
    };
}
