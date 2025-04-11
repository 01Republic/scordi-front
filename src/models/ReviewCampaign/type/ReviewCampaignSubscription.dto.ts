import {ReviewResponseSubscriptionDto} from '^models/ReviewResponse/type/ReviewResponseSubscription.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {SubscriptionDto} from '^models/Subscription/types';

/**
 * 요청 캠페인의 대상 구독
 */
export class ReviewCampaignSubscriptionDto {
    id: number;
    campaignId: number; // 캠페인 ID
    subscriptionId: number; // 구독 ID
    subscriptionName: string; // 구독명
    productId: number; // 서비스 ID
    productName: string; // 서비스명
    productImage: string; // 서비스 로고 이미지

    // 이 대상 구독에 대한 응답들
    @TypeCast(() => ReviewResponseSubscriptionDto)
    responseSubscriptions?: ReviewResponseSubscriptionDto[];

    // 구독
    @TypeCast(() => SubscriptionDto)
    subscription?: SubscriptionDto;
}
