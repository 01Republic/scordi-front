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
    subscriptionId: number;
    isUsedBefore: boolean; // 기존 이용상태 (as-is)
    usingStatus: ReviewResponseSubscriptionUsingStatus | null; // 이용상태 응답 (to-be)
    @TypeCast(() => Date) submittedAt?: Date | null; // 제출된 시각 (aliased) | undef: response join 안했을 때 / null: 제출안됨 / Date: 제출시각
    @TypeCast(() => ReviewResponseDto) response?: ReviewResponseDto;
    @TypeCast(() => TeamMemberDto) teamMember?: TeamMemberDto; // 응답자 (aliased)
    @TypeCast(() => ReviewCampaignSubscriptionDto) campaignSubscription?: ReviewCampaignSubscriptionDto;

    static groupByUsingStatus(items: ReviewResponseSubscriptionDto[]) {
        const {IN_USE, NO_USE, DONT_KNOW} = ReviewResponseSubscriptionUsingStatus;
        const filter = (value: ReviewResponseSubscriptionUsingStatus) =>
            items.filter((item) => {
                // item.usingStatus 가 null 인 것은 아직 응답을 안한 것.
                // '모름' 을 기본 상태로 두기로 한다.
                // 만약 응답하지 않은 것은 그룹바이의 결과로 취급하지 않는다고 하면,
                // 필터 결과에 포함되지 않도록 걸러주면 된다.
                const usingStatus = item.usingStatus || DONT_KNOW;
                return usingStatus === value;
            });

        return {
            [IN_USE]: filter(IN_USE),
            [NO_USE]: filter(NO_USE),
            [DONT_KNOW]: filter(DONT_KNOW),
        };
    }
}
