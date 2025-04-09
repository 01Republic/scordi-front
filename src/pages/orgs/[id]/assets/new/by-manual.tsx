import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {OrgAssetCreateByManualPage} from '^clients/private/orgs/assets/create-steps';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';

export const OrgAssetsCreateByManualPageRoute = pathRoute({
    pathname: '/orgs/[id]/assets/new/by-manual',
    path: (orgId: number) => pathReplace(OrgAssetsCreateByManualPageRoute.pathname, {id: orgId}),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgAssetCreateByManualPage />;
}
