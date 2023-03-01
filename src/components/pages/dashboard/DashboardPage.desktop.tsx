import React, {memo} from 'react';
import {ContentLayout} from '^layouts/ContentLayout';
import OrgMainLayout from '^layouts/org/mainLayout';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {PreLoader} from '^components/PreLoader';
import {
    SummaryPanel,
    UsersAndTeams,
    MonthlyTrend,
    UpcomingRenewals,
    SpendByCategory,
    BillingSchedulePanel,
} from './panels';

export const DashboardPageDesktop = memo(() => {
    return (
        <OrgMainLayout>
            <ContentLayout title="대시보드">
                <SummaryPanel />
                <BillingSchedulePanel />

                <div className="bs-container">
                    <div className="bs-row gap-8">
                        {/* Left Col */}
                        <div className="bs-col-12 sm:bs-col px-0">
                            <MonthlyTrend />
                            <UpcomingRenewals />
                        </div>

                        {/* Right Col */}
                        <div className="bs-col-12 sm:bs-col-4 px-0">
                            <SpendByCategory />
                            <UsersAndTeams />
                        </div>
                    </div>
                </div>
            </ContentLayout>
        </OrgMainLayout>
    );
});
