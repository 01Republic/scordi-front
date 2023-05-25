import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgHomePage as Page} from '^v3/V3OrgHomePage';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';

export const V3OrgHomePageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]',
    path: (orgId: number) => pathReplace(V3OrgHomePageRoute.pathname, {orgId}),
});

export default function V3OrgHomePage() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId) return <></>;

    return <Page />;
}
