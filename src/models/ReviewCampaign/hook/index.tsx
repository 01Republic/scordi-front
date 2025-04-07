import {useQuery} from '@tanstack/react-query';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {FindAllReviewCampaignsQueryDto} from '^models/ReviewCampaign/type/FindAllReviewCampaignsQuery.dto';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type/ReviewCampaign.dto';

export const useReviewCampaigns = (atoms: PagedResourceAtoms<ReviewCampaignDto, FindAllReviewCampaignsQueryDto>) => {
    return usePagedResource(atoms, {
        endpoint: (params, orgId) => reviewCampaignApi.index(orgId, params),
        useOrgId: true,
        buildQuery: (params, orgId) => {
            params.where = {organizationId: orgId, ...params.where};
            return params;
        },
        mergeMode: false,
        getId: 'id',
    });
};

export const useReviewCampaign = (orgId: number, id: number) => {
    return useQuery<ReviewCampaignDto>({
        queryKey: ['reviewCampaign', id],
        queryFn: () => reviewCampaignApi.show(orgId, id).then((res) => res.data),
        enabled: !!orgId,
    });
};
