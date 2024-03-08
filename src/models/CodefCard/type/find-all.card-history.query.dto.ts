import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

export class FindAllCardHistoryQueryDto extends FindAllQueryDto<CodefCardDto> {
    sync?: boolean; // 코드에프 결제내역 api 병합 실행 여부
}
