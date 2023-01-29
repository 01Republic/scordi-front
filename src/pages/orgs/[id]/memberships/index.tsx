import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {PreLoader} from '^components/PreLoader';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useOnResize} from '^hooks/useOnResize';
import {OrgMembershipIndexPageDesktop, OrgMembershipIndexPageMobile} from '^components/pages/OrgMembershipIndexPage';

export const OrgMembershipIndexPageRoute = pathRoute({
    pathname: '/orgs/[id]/memberships',
    path: (orgId: number) => pathReplace(OrgMembershipIndexPageRoute.pathname, {id: orgId}),
});

export default function OrgMembershipIndexPage() {
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const {mobileView} = useOnResize();

    if (!organizationId) return <PreLoader />;

    return mobileView ? <OrgMembershipIndexPageMobile /> : <OrgMembershipIndexPageDesktop />;
}
