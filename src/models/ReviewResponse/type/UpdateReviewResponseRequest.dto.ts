import {TypeCast} from '^types/utils/class-transformer';
import {CreateReviewResponseRequestDto} from './CreateReviewResponseRequest.dto';
import {PartialType} from '^types/utils/partial-type';

/**
 * 단일 응답지 수정 요청 폼
 */
export class UpdateReviewResponseRequestDto extends PartialType(CreateReviewResponseRequestDto) {
    @TypeCast(() => Date) submittedAt?: Date | null; // 제출완료 시각
}
