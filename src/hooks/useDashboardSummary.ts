import {useCallback, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getDashboardSummary} from '^api/dashboard.api';
import {errorNotify} from '^utils/toast-notify';
import {getQueryParams} from '^utils/get-query-params';
import {dashboardSummaryState, getDashboardSummaryQuery} from '^atoms/calendarData.atom';

export const useDashboardSummary = () => useRecoilValue(getDashboardSummaryQuery);

// on desktop
// 화면 깜빡임 문제가 발생해서 좀 더 경량화 함.
export function useDashboardSummary2() {
    const today = new Date();
    const queryParams = getQueryParams<{y: string; m: string}>(['y', 'm']);
    const year = parseInt(`${queryParams.y || today.getFullYear()}`);
    const month = parseInt(`${queryParams.m || today.getMonth() + 1}`);
    const [summaryData, setSummaryData] = useRecoilState(dashboardSummaryState);

    const setSummary = useCallback((y: number, m: number) => {
        getDashboardSummary(y, m)
            .then((res) => setSummaryData(res.data))
            .catch(errorNotify);
    }, []);

    useEffect(() => {
        if (!isNaN(year) && !isNaN(month)) setSummary(year, month);
    }, [year, month]);

    return {summaryData, setSummary, year, month};
}
