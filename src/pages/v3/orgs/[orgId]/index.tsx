import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgHomePage as Page} from '^v3/V3OrgHomePage';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {v3CommonRequires} from '^types/utils/18n.type';

export const V3OrgHomePageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]',
    path: (orgId: number) => pathReplace(V3OrgHomePageRoute.pathname, {orgId}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...v3CommonRequires, 'org-home'])),
        // Will be passed to the page component as props
    },
});

export default function V3OrgHomePage() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId) return <></>;

    return <Page />;
}
