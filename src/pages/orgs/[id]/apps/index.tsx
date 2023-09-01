import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useOnResize} from '^hooks/useOnResize';
import {OrgAppIndexPageDesktop, OrgAppIndexPageMobile} from '^components/pages/OrgAppIndexPage';

export const OrgAppIndexPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps',
    path: (orgId: number) => pathReplace(OrgAppIndexPageRoute.pathname, {id: orgId}),
});

export default function OrgAppIndexPage() {
    const {isMobile} = useOnResize();

    return isMobile ? <OrgAppIndexPageMobile /> : <OrgAppIndexPageDesktop />;
}
