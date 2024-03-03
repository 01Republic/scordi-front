import React from 'react';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {GoogleWorkspaceConnectorPage} from '^v3/V3OrgConnectorPages/GoogleWorkspaceConnectorPage';
import {GmailInvoiceConnectorPage} from '^v3/V3OrgConnectorPages/GmailInvoiceConnectorPage';
import {V3OrgConnectsPageRoute} from '^pages/v3/orgs/[orgId]/connects/index';

export enum Connectors {
    googleWorkspace = 'google-workspace',
    gmailInvoice = 'gmail-invoice',
}

export const V3OrgConnectorDetailPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/connects/[connectorName]',
    path: (orgId: number, connectorName: Connectors) =>
        pathReplace(V3OrgConnectorDetailPageRoute.pathname, {
            orgId,
            connectorName,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1', connectorName: Connectors.googleWorkspace}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires,
            'org-home',
            'google-compliance',
            // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.'org-home'
        ])),
    },
});

export default function V3OrgConnectorDetailPage() {
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);
    const connectorName = router.query.connectorName as string | undefined;

    if (!orgId || isNaN(orgId) || !connectorName) return <></>;

    if (connectorName === Connectors.googleWorkspace) return <GoogleWorkspaceConnectorPage />;
    if (connectorName === Connectors.gmailInvoice) return <GmailInvoiceConnectorPage />;

    router.replace(V3OrgConnectsPageRoute.path(orgId));

    return (
        <div>
            <div>
                <p>redirect to: {V3OrgConnectsPageRoute.path(orgId)}</p>
            </div>
        </div>
    );
}
