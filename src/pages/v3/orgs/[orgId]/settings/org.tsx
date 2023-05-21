import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgSettingsPage as Page} from '^v3/V3OrgSettingsPage';

export const V3OrgSettingsOrgPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/settings/org',
    path: (orgId: number) =>
        pathReplace(V3OrgSettingsOrgPageRoute.pathname, {
            orgId,
        }),
});

export default function V3OrgSettingsPage() {
    const router = useRouter();

    return <Page />;
}
