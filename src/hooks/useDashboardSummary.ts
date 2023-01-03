import {useRecoilState} from 'recoil';
import {dashboardSummaryAtom} from '^atoms/dashboardSummary.atom';
import {useEffect} from 'react';
import {getDashboardSummary} from '^api/dashboard.api';
import {errorNotify} from '^utils/toast-notify';
import {useCalendar} from '^hooks/useCalendar';

export const useDashboardSummary = () => {
    const {year, month, enabled} = useCalendar();
    const [summaryDto, setSummaryDto] = useRecoilState(dashboardSummaryAtom);

    useEffect(() => {
        if (!enabled) return;

        console.log(enabled, year, month);
        getDashboardSummary(year, month)
            .then(({data}) => setSummaryDto(data))
            .catch(errorNotify);
    }, [enabled, year, month]);

    return {
        summaryDto,
        setSummaryDto,
    };
};
