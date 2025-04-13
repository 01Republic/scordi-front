import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {OrgReviewCampaignDetailChangesPage} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignDetailPage/ChangesPage';

export const OrgReviewCampaignDetailChangesPageRoute = pathRoute({
    pathname: '/orgs/[id]/reviewCampaigns/[reviewCampaignId]/changes',
    path: (orgId: number, reviewCampaignId: number) =>
        pathReplace(OrgReviewCampaignDetailChangesPageRoute.pathname, {id: orgId, reviewCampaignId}),
});

// export const getStaticPaths = async () => ({
//     paths: [{params: {id: '1', reviewCampaignId: '1'}}],
//     fallback: true,
// });

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgReviewCampaignDetailChangesPage />;
}
