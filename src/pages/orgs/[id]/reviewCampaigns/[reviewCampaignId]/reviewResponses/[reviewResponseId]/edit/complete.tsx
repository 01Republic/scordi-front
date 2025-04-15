import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {ReviewResponseCompletePage} from '^clients/private/orgs/reviewCampaigns/OrgReviewResponseCompletePage';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';

export const OrgReviewResponseCompletePageRoute = pathRoute({
    pathname: '/orgs/[id]/reviewCampaigns/[reviewCampaignId]/reviewResponses/[reviewResponseId]/edit/complete',
    path: (orgId: number, reviewCampaignId: number, reviewResponseId: number) =>
        pathReplace(OrgReviewResponseCompletePageRoute.pathname, {id: orgId, reviewCampaignId, reviewResponseId}),
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <ReviewResponseCompletePage />;
}
