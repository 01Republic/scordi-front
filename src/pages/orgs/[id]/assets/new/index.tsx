import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {OrgAssetCreateMethodSelectPage} from '^clients/private/orgs/assets/create-steps';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';

export const OrgAssetsCreateMethodSelectPageRoute = pathRoute({
    pathname: '/orgs/[id]/assets/new',
    path: (orgId: number) => pathReplace(OrgAssetsCreateMethodSelectPageRoute.pathname, {id: orgId}),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgAssetCreateMethodSelectPage />;
}
