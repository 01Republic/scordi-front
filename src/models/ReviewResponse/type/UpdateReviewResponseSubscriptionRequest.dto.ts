import {ReviewResponseSubscriptionUsingStatus} from './ReviewResponseSubscriptionUsingStatus.enum';

export class UpdateReviewResponseSubscriptionRequestDto {
    id: number; // ID
    subscriptionId: number; // 구독 ID
    usingStatus: ReviewResponseSubscriptionUsingStatus | null; // 이용상태 응답
}
