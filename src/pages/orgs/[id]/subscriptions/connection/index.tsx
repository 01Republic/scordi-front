import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {OrgSubscriptionConnectionPage} from '^clients/private/orgs/subscriptions/connection-steps/OrgSubscriptionConnectionPage';

export const OrgSubscriptionConnectionPageRoute = pathRoute({
    pathname: '/orgs/[id]/subscriptions/connection',
    path: (orgId: number) => pathReplace(OrgSubscriptionConnectionPageRoute.pathname, {id: orgId}),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId) return <></>;

    return <OrgSubscriptionConnectionPage />;
}
