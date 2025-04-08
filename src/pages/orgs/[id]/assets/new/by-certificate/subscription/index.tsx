import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {OrgAssetCreateSubscriptionPage} from '^clients/private/orgs/assets/create-steps/OrgAssetCreateByCertificatePage/OrgAssetCreateSubscriptionPage';

export const OrgAssetsCreateSubscriptionPageRoute = pathRoute({
    pathname: '/orgs/[id]/assets/new/by-certificate/subscription',
    path: (orgId: number) => pathReplace(OrgAssetsCreateSubscriptionPageRoute.pathname, {id: orgId}),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgAssetCreateSubscriptionPage />;
}
