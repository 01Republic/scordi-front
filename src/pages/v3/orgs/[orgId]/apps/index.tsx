import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgAppsPage as Page} from '^v3/V3OrgAppsPage';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';

export const V3OrgAppsPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/apps',
    path: (orgId: number) =>
        pathReplace(V3OrgAppsPageRoute.pathname, {
            orgId,
        }),
});

export default function V3OrgAppsPage() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId) return <></>;

    return <Page />;
}
