import {useRouter} from 'next/router';
import {useEffect, useMemo} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {calendarDataAtom, calendarParamsState, getDashboardCalendarQuery} from '^atoms/calendarData.atom';
import {getDashboardCalendar} from '^api/dashboard.api';
import {errorNotify} from '^utils/toast-notify';

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
