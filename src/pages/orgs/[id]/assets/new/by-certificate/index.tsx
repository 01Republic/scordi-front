import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {OrgAssetCreateByCertificatePage} from '^clients/private/orgs/assets/create-steps';

export const OrgAssetsCreateByCertificatePageRoute = pathRoute({
    pathname: '/orgs/[id]/assets/new/by-certificate',
    path: (orgId: number) => pathReplace(OrgAssetsCreateByCertificatePageRoute.pathname, {id: orgId}),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgAssetCreateByCertificatePage />;
}
