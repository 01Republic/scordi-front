import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {OrgSubscriptionConnectionSuccessPage} from '^clients/private/orgs/subscriptions/connection-steps/OrgSubscriptionConnectionSuccessPage';

export const OrgSubscriptionConnectionSuccessPageRoute = pathRoute({
    pathname: '/orgs/[id]/subscriptions/connection/success',
    path: (orgId: number) => pathReplace(OrgSubscriptionConnectionSuccessPageRoute.pathname, {id: orgId}),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId) return <></>;

    return <OrgSubscriptionConnectionSuccessPage />;
}
