import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {PreLoader} from '^components/PreLoader';
import {DashboardPageDesktop} from '^components/pages/dashboard/DashboardPage.desktop';
import {DashboardPageMobile} from '^components/pages/dashboard/DashboardPage.mobile';
import {useOnResize} from '^hooks/useOnResize';

export const OrgHomeRoute = pathRoute({
    pathname: '/orgs/[id]/home',
    path: (orgId: number) => pathReplace(OrgHomeRoute.pathname, {id: orgId}),
});

export default function HomePage() {
    const {isMobile} = useOnResize();

    return isMobile ? <DashboardPageMobile /> : <DashboardPageDesktop />;
}
