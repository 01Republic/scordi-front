import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {PreLoader} from '^components/PreLoader';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {DashboardPageDesktop} from '^components/pages/dashboard/DashboardPage.desktop';
import {DashboardPageMobile} from '^components/pages/dashboard/DashboardPage.mobile';
import {useOnResize} from '^hooks/useOnResize';

export const OrgHomeRoute = pathRoute({
    pathname: '/orgs/[id]/home',
    path: (orgId: number) => pathReplace(OrgHomeRoute.pathname, {id: orgId}),
});

export default function HomePage() {
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const {mobileView} = useOnResize();

    if (!organizationId) return <PreLoader />;

    return mobileView ? <DashboardPageMobile /> : <DashboardPageDesktop />;
}
