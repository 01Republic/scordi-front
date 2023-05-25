import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgSettingsBillingPage as Page} from '^v3/V3OrgSettingsBillingPage';

export const V3OrgSettingsBillingPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/settings/billing',
    path: (orgId: number) =>
        pathReplace(V3OrgSettingsBillingPageRoute.pathname, {
            orgId,
        }),
});

export default function V3OrgSettingsBillingPage() {
    const router = useRouter();

    return <Page />;
}

V3OrgSettingsBillingPage.getInitialProps = async () => ({});
