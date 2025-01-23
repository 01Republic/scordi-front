import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useDashboardSummaryYearMonthlyResult} from '^models/_dashboard/hook';
import {YearMonthlyGraphSection} from './YearMonthlyGraphSection';
import {YearMonthlySubscriptionsSection} from './YearMonthlySubscriptionsSection';
import {DashboardSummaryYearMonthlyItemDto} from '^models/_dashboard/type';

export const YearlySection = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const [year, setYear] = useState(new Date().getFullYear());
    const [selectedMonthlyItem, setSelectedMonthlyItem] = useState<DashboardSummaryYearMonthlyItemDto>();
    const {data: dashboardSummaryYearMonthlyResult, isLoading} = useDashboardSummaryYearMonthlyResult(orgId, year);

    return (
        <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2">
                <YearMonthlyGraphSection
                    year={year}
                    // changeYear={setYear}
                    result={dashboardSummaryYearMonthlyResult}
                    isLoading={isLoading}
                    changeMonthlyItem={setSelectedMonthlyItem}
                />
            </div>
            <div className="col-span-1">
                <YearMonthlySubscriptionsSection
                    result={dashboardSummaryYearMonthlyResult}
                    isLoading={isLoading}
                    monthlyItem={selectedMonthlyItem}
                />
            </div>
        </div>
    );
});
