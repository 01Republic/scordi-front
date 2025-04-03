import {pagedResourceAtom} from '^hooks/usePagedResource';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type/ReviewCampaign.dto';
import {FindAllReviewCampaignsQueryDto} from '^models/ReviewCampaign/type/FindAllReviewCampaignsQuery.dto';

export const reviewCampaignListAtom = pagedResourceAtom<ReviewCampaignDto, FindAllReviewCampaignsQueryDto>({
    key: 'reviewCampaignListAtom',
});
