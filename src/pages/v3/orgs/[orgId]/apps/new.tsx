import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {V3OrgAppsNewPage} from '^v3/V3OrgAppsNewPage';

export const V3OrgAppsNewPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/apps/new',
    path: (orgId: number) => pathReplace(V3OrgAppsNewPageRoute.pathname, {orgId}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...v3CommonRequires, 'org-home', 'google-compliance'])),
        // Will be passed to the page component as props
    },
});

export default function V3OrgAppsNew() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId) return <></>;

    return <V3OrgAppsNewPage />;
}
