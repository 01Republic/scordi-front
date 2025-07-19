import React from 'react';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {OrgIntegrationGoogleWorkspaceDetailPage} from '^clients/private/orgs/settings/integrations/google-workspace/OrgIntegrationGoogleWorkspaceDetailPage';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';

export const OrgIntegrationGoogleWorkspaceDetailPageRoute = pathRoute({
    pathname: '/orgs/[id]/settings/integrations/google-workspace/[workspaceId]',
    path: (orgId: number, workspaceId: number) =>
        pathReplace(OrgIntegrationGoogleWorkspaceDetailPageRoute.pathname, {
            id: orgId,
            workspaceId,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1', workspaceId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [...v3CommonRequires, 'workspaceSettings', 'integrations'])),
    },
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgIntegrationGoogleWorkspaceDetailPage />;
}
