import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

export class FindAllCardQueryDto<T = CodefCardDto> extends FindAllQueryDto<T> {
    sync?: boolean;
    connected?: boolean; // 연결된 카드만 필터 여부 (기본: 전체/ 참: 연결된카드만/ 거짓: 신규카드만) - where[codefCardId] 와 함께 사용 불가
}

export class FindAllCardAdminQueryDto<T = CodefCardDto> extends FindAllQueryDto<T> {
    organizationId?: number;
}

export class BulkPatchCodefCardsHistoriesForAdminQueryDto extends FindAllCardAdminQueryDto<CodefCardDto> {
    startDate?: string; // 조회시작일 (yyyy-mm-dd)
    endDate?: string; // 조회종료일 (yyyy-mm-dd)
}
