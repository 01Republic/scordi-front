import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {DashboardPageMobile} from '^components/pages/dashboard/DashboardPage.mobile';
import {DashboardPageDesktop} from '^components/pages/dashboard/DashboardPage.desktop';

export const DashboardPageRoute = pathRoute({
    pathname: '/orgs/[id]/dashboard',
    path: (orgId: number) => pathReplace(DashboardPageRoute.pathname, {id: orgId}),
});

export default function DashboardPage() {
    return (
        <>
            <DashboardPageMobile />
            {/*<DashboardPageDesktop />*/}
        </>
    );
}
