import { orgIdParamState, useRouterIdParamState } from "^atoms/common";
import { ManualConnectPage } from "^clients/private/orgs/assets/connect/ManualConnect";
import { useCurrentOrg } from "^models/Organization/hook";
import { pathReplace, pathRoute } from '^types/pageRoute.type';

export const OrgConnectManualPageRoute = pathRoute({
    pathname: "/orgs/[id]/assets/connect/manual",
    path: (orgId: number) => pathReplace(OrgConnectManualPageRoute.pathname, { id: orgId }),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <ManualConnectPage />;
}

