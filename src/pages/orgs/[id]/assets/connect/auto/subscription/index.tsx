import { orgIdParamState, useRouterIdParamState } from '^atoms/common';
import { AutoConnectSubscriptionPage } from '^clients/private/orgs/assets/connect/AutoConnect/AutoConnectSubscription';
import { useCurrentOrg } from '^models/Organization/hook';
import { pathReplace, pathRoute } from '^types/pageRoute.type';

export const OrgConnectAutoSubscriptionPageRoute = pathRoute({
    pathname: '/orgs/[id]/assets/connect/auto/subscription',
    path: (orgId: number) => pathReplace(OrgConnectAutoSubscriptionPageRoute.pathname, { id: orgId }),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <AutoConnectSubscriptionPage />;
}
