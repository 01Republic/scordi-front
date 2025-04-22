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

    get domId() {
        return `sub-${this.id}`;
    }

    get title() {
        return `${this.productName} ${this.subscriptionName ? `- ${this.subscriptionName}` : ''}`;
    }

    changedResponseSubs() {
        const responseSubs = this.responseSubscriptions || [];
        return responseSubs.filter((responseSub) => {
            if (responseSub.subscriptionId !== this.subscriptionId) return false;

            // 미제출 응답은 제외
            if (!responseSub.submittedAt) return false;

            // 기존 상태와 비교해 변경된 응답이 아닌것은 제외.
            if (!responseSub.isUsingStatusChanged) return false;

            return true;
        });
    }

    hasChanged() {
        return this.changedResponseSubs().length > 0;
    }
}
