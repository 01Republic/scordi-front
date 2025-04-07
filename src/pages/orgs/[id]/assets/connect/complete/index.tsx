import { orgIdParamState, useRouterIdParamState } from '^atoms/common';
import { AutoConnectCompletePage } from '^clients/private/orgs/assets/connect/AutoConnect/AutoConnectComplete';
import { useCurrentOrg } from '^models/Organization/hook';
import { pathReplace, pathRoute } from '^types/pageRoute.type';

export const OrgConnectAutoCompletePageRoute = pathRoute({
    pathname: '/orgs/[id]/assets/connect/auto/subscription',
    path: (orgId: number) => pathReplace(OrgConnectAutoCompletePageRoute.pathname, { id: orgId }),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <AutoConnectCompletePage />;
}
