import {useRouter} from 'next/router';
import {useCallback, useEffect, useMemo} from 'react';
import {SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
    calendarDataAtom,
    calendarParamsState,
    calendarSelectedDateState,
    getDashboardCalendarQuery,
} from '^atoms/calendarData.atom';
import {getDashboardCalendar} from '^api/dashboard.api';
import {errorNotify} from '^utils/toast-notify';
import {getQueryParams} from '^utils/get-query-params';

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

    const setCalendar = useCallback((y: number, m: number) => {
        getDashboardCalendar(y, m)
            .then((res) => setCalendarData(res.data))
            .catch(errorNotify);
    }, []);

    useEffect(() => {
        if (!isNaN(year) && !isNaN(month)) setCalendar(year, month);
    }, [year, month]);

    return {calendarData, setCalendar, year, month, selectDate};
}
