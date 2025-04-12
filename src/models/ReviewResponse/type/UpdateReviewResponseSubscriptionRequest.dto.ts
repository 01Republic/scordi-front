import {ReviewResponseSubscriptionUsingStatus} from './ReviewResponseSubscriptionUsingStatus.enum';

export class UpdateReviewResponseSubscriptionRequestDto {
    subscriptionId: number; // 구독 ID
    usingStatus: ReviewResponseSubscriptionUsingStatus | null; // 이용상태 응답
}
