import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {OrgAssetCreateByAccountPage} from '^clients/private/orgs/assets/create-steps';

export const OrgAssetsCreateByAccountPageRoute = pathRoute({
    pathname: '/orgs/[id]/assets/new/by-account',
    path: (orgId: number) => pathReplace(OrgAssetsCreateByAccountPageRoute.pathname, {id: orgId}),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId) return <></>;

    return <OrgAssetCreateByAccountPage />;
}
