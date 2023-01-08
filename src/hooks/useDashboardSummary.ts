import {useRecoilState, useRecoilValue} from 'recoil';
import {dashboardSummaryAtom} from '^atoms/dashboardSummary.atom';
import {useEffect} from 'react';
import {getDashboardSummary} from '^api/dashboard.api';
import {errorNotify} from '^utils/toast-notify';
import {useCalendar} from '^hooks/useCalendar';
import {getDashboardSummaryQuery} from '^atoms/calendarData.atom';

export const useDashboardSummary = () => useRecoilValue(getDashboardSummaryQuery);
