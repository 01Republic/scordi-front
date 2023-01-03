import {useRouter} from 'next/router';
import {useEffect, useMemo} from 'react';
import {useRecoilState} from 'recoil';
import {calendarDataAtom} from '^atoms/calendarData.atom';
import {getDashboardCalendar} from '^api/dashboard.api';
import {errorNotify} from '^utils/toast-notify';

export function useCalendar() {
    const router = useRouter();
    const {
        query: {id, y, m},
    } = router;
    const organizationId = useMemo(() => Number(id), [id]);
    const year = useMemo(() => (y ? Number(y) : new Date().getFullYear()), [y]);
    const month = useMemo(() => (m ? Number(m) : new Date().getMonth() + 1), [m]);
    const [calendarData, setCalendarData] = useRecoilState(calendarDataAtom);

    useEffect(() => {
        organizationId &&
            getDashboardCalendar(year, month)
                .then(({data}) => setCalendarData(data))
                .catch(errorNotify);
    }, [year, month]);

    return {
        enabled: !!organizationId,
        year,
        month,
        calendarData,
    };
}
