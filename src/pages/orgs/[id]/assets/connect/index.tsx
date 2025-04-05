import { orgIdParamState, useRouterIdParamState } from '^atoms/common';
import { ConnectAssetContentPage } from '^clients/private/orgs/assets/connect';
import { useCurrentOrg } from '^models/Organization/hook';
import { pathReplace, pathRoute } from '^types/pageRoute.type';

export const OrgAssetsConnectPageRoute = pathRoute({
    pathname: '/orgs/[id]/assets/connect',
    path: (orgId: number) => pathReplace(OrgAssetsConnectPageRoute.pathname, { id: orgId }),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <ConnectAssetContentPage />;
}