import { orgIdParamState, useRouterIdParamState } from '^atoms/common';
import { AutoConnectPage } from '^clients/private/orgs/assets/connect/AutoConnect';
import { useCurrentOrg } from '^models/Organization/hook';
import { pathReplace, pathRoute } from '^types/pageRoute.type';

export const OrgConnectAutoPageRoute = pathRoute({
    pathname: '/orgs/[id]/assets/connect/auto',
    path: (orgId: number) => pathReplace(OrgConnectAutoPageRoute.pathname, { id: orgId }),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <AutoConnectPage />;
}
