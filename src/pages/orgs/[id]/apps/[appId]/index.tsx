import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useOnResize} from '^hooks/useOnResize';
import {ApplicationDetailPageMobile} from '^components/pages/ApplicationDetailPage';
import {ApplicationDetailPageDesktop} from '^components/pages/ApplicationDetailPage';

export const AppInfoPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/[appId]',
    path: (orgId: number, appId: number) => pathReplace(AppInfoPageRoute.pathname, {id: orgId, appId}),
});

export default function AppInfoPage() {
    const {mobileView} = useOnResize();

    return mobileView ? <ApplicationDetailPageMobile /> : <ApplicationDetailPageDesktop />;
}
