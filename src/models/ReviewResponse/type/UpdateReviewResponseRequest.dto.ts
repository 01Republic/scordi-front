import {PartialType} from '^types/utils/partial-type';
import {CreateReviewResponseRequestDto} from './CreateReviewResponseRequest.dto';
import {UpdateReviewResponseSubscriptionRequestDto} from './UpdateReviewResponseSubscriptionRequest.dto';
import {TypeCast} from '^types/utils/class-transformer';

/**
 * 단일 응답지 수정 요청 폼
 */
export class UpdateReviewResponseRequestDto extends PartialType(CreateReviewResponseRequestDto) {
    submittedAt?: Date | null; // 제출완료 시각

    respondentName?: string | null; // 비회원의 경우에만
    respondentEmail?: string | null; // 비회원의 경우에만
    respondentTeamId?: number | null; // 비회원의 경우에만

    otherSubscriptionComment?: string | null; // 새롭게 이용중인 구독서비스 추가 제안
    inquiry?: string; // 문의사항

    // 구독 응답 목록
    @TypeCast(() => UpdateReviewResponseSubscriptionRequestDto)
    subscriptions: UpdateReviewResponseSubscriptionRequestDto[];
}
