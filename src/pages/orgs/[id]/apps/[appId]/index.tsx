import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useOnResize} from '^hooks/useOnResize';
import {OrgAppShowPageMobile, OrgAppShowPageDesktop} from '^components/pages/OrgAppShowPage';

export const OrgAppShowPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/[appId]',
    path: (orgId: number, appId: number) => pathReplace(OrgAppShowPageRoute.pathname, {id: orgId, appId}),
});

export default function OrgAppShowPage() {
    const {isMobile} = useOnResize();

    return isMobile ? <OrgAppShowPageMobile /> : <OrgAppShowPageDesktop />;
}
