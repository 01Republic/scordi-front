import {useCallback, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getDashboardSummary, getDashboardSummaryV3} from '^api/dashboard.api';
import {errorNotify} from '^utils/toast-notify';
import {getQueryParams} from '^utils/get-query-params';
import {dashboardSummaryState, dashboardSummaryV3State, getDashboardSummaryQuery} from '^atoms/calendarData.atom';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {GetBillingHistoriesParams} from '^models/BillingHistory/type';

export const useDashboardSummary = () => useRecoilValue(getDashboardSummaryQuery);

// on desktop
// 화면 깜빡임 문제가 발생해서 좀 더 경량화 함.
export function useDashboardSummary2() {
    const today = new Date();
    const queryParams = getQueryParams<{y: string; m: string}>(['y', 'm']);
    const year = parseInt(`${queryParams.y || today.getFullYear()}`);
    const month = parseInt(`${queryParams.m || today.getMonth() + 1}`);
    const [summaryData, setSummaryData] = useRecoilState(dashboardSummaryState);
    const organizationId = useRouterIdParamState('id', orgIdParamState);

    const setSummary = useCallback((organizationId: number, y: number, m: number) => {
        getDashboardSummary(organizationId, y, m)
            .then((res) => setSummaryData(res.data))
            .catch(errorNotify);
    }, []);

    useEffect(() => {
        if (!isNaN(year) && !isNaN(month)) setSummary(organizationId, year, month);
    }, [year, month]);

    return {summaryData, setSummary, year, month};
}

/**
 * V3
 */

export const useDashboardSummaryV3 = () => {
    const [summary, setSummary] = useRecoilState(dashboardSummaryV3State);
    async function getSummary(params: GetBillingHistoriesParams) {
        const orgId = params.where?.organizationId;
        if (!orgId) return;
        const data = await getDashboardSummaryV3(orgId, params).then((res) => res.data);
        setSummary(data);
    }

    return {data: summary, mutate: getSummary};
};
