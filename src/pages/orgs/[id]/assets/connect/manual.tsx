import { orgIdParamState, useRouterIdParamState } from "^atoms/common";
import { ManualConnectPage } from "^clients/private/orgs/assets/connect/ManualConnect";
import { pathReplace, pathRoute } from '^types/pageRoute.type';

export const OrgConnectManualPageRoute = pathRoute({
    pathname: "/orgs/[id]/assets/connect/manual",
    path: (orgId: number) => pathReplace(OrgConnectManualPageRoute.pathname, { id: orgId }),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    if (!orgId) return null;

    return <ManualConnectPage orgId={orgId} />;
}

