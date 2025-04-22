import {TypeCast} from '^types/utils/class-transformer';
import {TeamMemberDto} from '^models/TeamMember';
import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type';
import {ReviewResponseDto} from './ReviewResponse.dto';
import {ReviewResponseSubscriptionUsingStatus} from './ReviewResponseSubscriptionUsingStatus.enum';

/**
 * 요청 캠페인 응답지의 구독 응답
 */
export class ReviewResponseSubscriptionDto {
    id: number;
    responseId: number; // 응답지 ID
    campaignSubscriptionId: number; // 캠페인 대상 구독 ID
    subscriptionId: number;
    isUsedBefore: boolean; // 기존 이용상태 (as-is)
    usingStatus: ReviewResponseSubscriptionUsingStatus | null; // 이용상태 응답 (to-be)
    @TypeCast(() => Date) submittedAt?: Date | null; // 제출된 시각 (aliased) | undef: response join 안했을 때 / null: 제출안됨 / Date: 제출시각
    @TypeCast(() => ReviewResponseDto) response?: ReviewResponseDto;
    @TypeCast(() => TeamMemberDto) teamMember?: TeamMemberDto; // 응답자 (aliased)
    @TypeCast(() => ReviewCampaignSubscriptionDto) campaignSubscription?: ReviewCampaignSubscriptionDto;

    static groupByUsingStatus(items: ReviewResponseSubscriptionDto[]) {
        const {IN_USE, NO_USE, DONT_KNOW} = ReviewResponseSubscriptionUsingStatus;
        const filter = (value: ReviewResponseSubscriptionUsingStatus) => {
            return items.filter((item) => item.usingStatus === value);
        };

        return {
            [IN_USE]: filter(IN_USE),
            [NO_USE]: filter(NO_USE),
            [DONT_KNOW]: filter(DONT_KNOW),
        };
    }

    get usingStatusFormValue(): ReviewResponseSubscriptionUsingStatus {
        return this.usingStatus || this.usingStatusBefore;
    }

    get usingStatusBefore(): ReviewResponseSubscriptionUsingStatus {
        return this.isUsedBefore
            ? ReviewResponseSubscriptionUsingStatus.IN_USE
            : ReviewResponseSubscriptionUsingStatus.NO_USE;
    }

    get isUsingStatusChanged() {
        return this.usingStatusBefore !== this.usingStatus;
    }
}
