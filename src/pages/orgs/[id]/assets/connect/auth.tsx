import { orgIdParamState, useRouterIdParamState } from '^atoms/common';
import { AuthConnectPage } from '^clients/private/orgs/assets/connect/AuthConnect';
import { pathReplace, pathRoute } from '^types/pageRoute.type';

export const OrgConnectAuthPageRoute = pathRoute({
    pathname: '/orgs/[id]/assets/connect/auth',
    path: (orgId: number) => pathReplace(OrgConnectAuthPageRoute.pathname, { id: orgId }),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);

    if (!orgId) return <></>;

    return <AuthConnectPage />
}
