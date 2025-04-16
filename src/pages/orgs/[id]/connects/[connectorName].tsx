import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {ExcelConnectorPage} from '^clients/private/orgs/connects/ExcelConnectorPage';
import {GoogleWorkspaceConnectorPage} from '^clients/private/orgs/connects/GoogleWorkspaceConnectorPage';
import {SlackConnectorPage} from '^clients/private/orgs/connects/SlackConnectorPage';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useRouter} from 'next/router';

export enum Connectors {
    googleWorkspace = 'google-workspace',
    slack = 'slack',
    excel = 'excel',
}

export const OrgConnectorDetailPageRoute = pathRoute({
    pathname: '/orgs/[id]/connects/[connectorName]',
    path: (id: number, connectorName: Connectors) =>
        pathReplace(OrgConnectorDetailPageRoute.pathname, {
            id,
            connectorName,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1', connectorName: Connectors.googleWorkspace}}],
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

export default function OrgConnectorDetailPage() {
    const router = useRouter();
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);
    const connectorName = router.query.connectorName as string | undefined;

    if (!orgId || isNaN(orgId) || !connectorName) return <></>;

    if (connectorName === Connectors.googleWorkspace) return <GoogleWorkspaceConnectorPage />;
    if (connectorName === Connectors.slack) return <SlackConnectorPage />;
    if (connectorName === Connectors.excel) return <ExcelConnectorPage />;

    return (
        <div>
            <div>
                <p>redirect to: {OrgConnectorDetailPageRoute.path(orgId, connectorName as Connectors)}</p>
            </div>
        </div>
    );
}
