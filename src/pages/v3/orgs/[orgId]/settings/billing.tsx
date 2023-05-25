import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgSettingsBillingPage as Page} from '^v3/V3OrgSettingsBillingPage';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';

export const V3OrgSettingsBillingPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/settings/billing',
    path: (orgId: number) =>
        pathReplace(V3OrgSettingsBillingPageRoute.pathname, {
            orgId,
        }),
});

export default function V3OrgSettingsBillingPage() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId) return <></>;

    return <Page />;
}
