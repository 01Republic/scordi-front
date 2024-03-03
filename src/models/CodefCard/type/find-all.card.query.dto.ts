import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

export class FindAllCardQueryDto extends FindAllQueryDto<CodefCardDto> {
    sync?: boolean;
}
