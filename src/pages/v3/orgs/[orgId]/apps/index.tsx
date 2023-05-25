import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgAppsPage as Page} from '^v3/V3OrgAppsPage';

export const V3OrgAppsPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/apps',
    path: (orgId: number) =>
        pathReplace(V3OrgAppsPageRoute.pathname, {
            orgId,
        }),
});

export default function V3OrgAppsPage() {
    const router = useRouter();

    return <Page />;
}

V3OrgAppsPage.getInitialProps = async () => ({});
