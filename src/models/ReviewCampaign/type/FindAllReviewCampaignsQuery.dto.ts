import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {ReviewCampaignDto} from './ReviewCampaign.dto';

export class FindAllReviewCampaignsQueryDto extends FindAllQueryDto<ReviewCampaignDto> {
    // 검색 키워드
    keyword?: string;
}
