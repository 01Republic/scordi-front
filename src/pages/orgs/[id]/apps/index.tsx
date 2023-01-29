import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useOnResize} from '^hooks/useOnResize';
import {OrgAppIndexPageDesktop, OrgAppIndexPageMobile} from '^components/pages/OrgAppIndexPage';

export const OrgAppsIndexPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps',
    path: (orgId: number) => pathReplace(OrgAppsIndexPageRoute.pathname, {id: orgId}),
});

export default function OrgAppsIndexPage() {
    const {mobileView} = useOnResize();

    return mobileView ? <OrgAppIndexPageMobile /> : <OrgAppIndexPageDesktop />;
}
