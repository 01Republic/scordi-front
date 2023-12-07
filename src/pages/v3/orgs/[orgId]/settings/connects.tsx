import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {V3OrgSettingsConnectsPage as Page} from 'src/components/pages/v3/V3OrgSettingsConnectsPage';

export const V3OrgSettingsConnectsPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/settings/connects',
    path: (orgId: number) => pathReplace(V3OrgSettingsConnectsPageRoute.pathname, {orgId}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires,
            'org-setting',
            'org-home',
            'google-compliance',
            'newInvoiceAccountModal',
        ])),
        // Will be passed to the page component as props
    },
});

export default function V3OrgSettingsConnectsPage() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId) return <></>;

    return <Page />;
}
