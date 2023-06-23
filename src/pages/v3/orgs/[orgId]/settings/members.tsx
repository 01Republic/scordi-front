import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgSettingsMembersPage as Page} from '^v3/V3OrgSettingsMembersPage';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';

export const V3OrgSettingsMembersPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/settings/members',
    path: (orgId: number) =>
        pathReplace(V3OrgSettingsMembersPageRoute.pathname, {
            orgId,
        }),
});

export default function V3OrgSettingsMembersPage() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId) return <></>;

    return <Page />;
}
