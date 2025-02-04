import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';

export class FindAllAccountQueryForAdminDto extends FindAllQueryDto<CodefAccountDto> {
    sync?: boolean;
}
