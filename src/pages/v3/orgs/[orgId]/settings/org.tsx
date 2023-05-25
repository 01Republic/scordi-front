import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgSettingsPage as Page} from '^v3/V3OrgSettingsPage';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';

export const V3OrgSettingsOrgPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/settings/org',
    path: (orgId: number) =>
        pathReplace(V3OrgSettingsOrgPageRoute.pathname, {
            orgId,
        }),
});

export default function V3OrgSettingsPage() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId) return <></>;

    return <Page />;
}
