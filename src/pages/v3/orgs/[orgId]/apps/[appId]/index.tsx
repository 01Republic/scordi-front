import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {V3OrgAppShowPage} from '^v3/V3OrgAppShowPage';

export const V3OrgAppShowPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/apps/[appId]',
    path: (orgId: number, appId: number) =>
        pathReplace(V3OrgAppShowPageRoute.pathname, {
            orgId,
            appId,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1', appId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...v3CommonRequires, 'org-home', 'google-compliance'])),
        // Will be passed to the page component as props
    },
});

export default function Page() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId) return <></>;

    return <V3OrgAppShowPage />;
}
