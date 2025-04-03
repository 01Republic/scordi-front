import {ReviewResponseDto} from '^models/ReviewResponse/type/ReviewResponse.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type/ReviewCampaignSubscription.dto';
import {ReviewResponseSubscriptionUsingStatus} from './ReviewResponseSubscriptionUsingStatus.enum';

/**
 * 요청 캠페인 응답지의 구독 응답
 */
export class ReviewResponseSubscriptionDto {
    responseId: number; // 응답지 ID
    subscriptionId: number;
    usingStatus: ReviewResponseSubscriptionUsingStatus | null; // 이용상태 응답
    @TypeCast(() => ReviewResponseDto) response?: ReviewResponseDto;
    @TypeCast(() => ReviewCampaignSubscriptionDto) campaignSubscription?: ReviewCampaignSubscriptionDto;
}
