import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {OrgAssetCreateCompletePage} from '^clients/private/orgs/assets/create-steps';

/** DEPRECATED PAGE (DO NOT USE!!) */
export const OrgAssetsCreateCompletePageRoute = pathRoute({
    pathname: '/orgs/[id]/assets/new/complete',
    path: (orgId: number) => pathReplace(OrgAssetsCreateCompletePageRoute.pathname, {id: orgId}),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgAssetCreateCompletePage />;
}
