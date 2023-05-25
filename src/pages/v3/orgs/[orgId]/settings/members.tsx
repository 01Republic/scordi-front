import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgSettingsMembersPage as Page} from '^v3/V3OrgSettingsMembersPage';

export const V3OrgSettingsMembersPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/settings/members',
    path: (orgId: number) =>
        pathReplace(V3OrgSettingsMembersPageRoute.pathname, {
            orgId,
        }),
});

export default function V3OrgSettingsMembersPage() {
    const router = useRouter();

    return <Page />;
}
