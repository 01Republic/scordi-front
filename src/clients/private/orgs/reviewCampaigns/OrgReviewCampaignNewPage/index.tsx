import {useIdParam} from '^atoms/common';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {OrgReviewCampaignDetailPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]';
import {RequestCampaignCreateForm} from './RequestCampaignCreateForm';

export const OrgReviewCampaignNewPage = () => {
    const orgId = useIdParam('id');

    return (
        <MainLayout>
            <MainContainer>
                <RequestCampaignCreateForm
                    orgId={orgId}
                    redirectTo={(createdCampaign) => OrgReviewCampaignDetailPageRoute.path(orgId, createdCampaign.id)}
                />
            </MainContainer>
        </MainLayout>
    );
};
