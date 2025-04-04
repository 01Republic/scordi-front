import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import OrgReviewCampaignDetailPage from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignDetailPage';

export const OrgReviewCampaignDetailPageRoute = pathRoute({
    pathname: '/orgs/[id]/reviewCampaigns/[reviewCampaignId]',
    path: (orgId: number, reviewCampaignId: number) =>
        pathReplace(OrgReviewCampaignDetailPageRoute.pathname, {id: orgId, reviewCampaignId}),
});

// export const getStaticPaths = async () => ({
//     paths: [{params: {id: '1', reviewCampaignId: '1'}}],
//     fallback: true,
// });

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgReviewCampaignDetailPage />;
}
