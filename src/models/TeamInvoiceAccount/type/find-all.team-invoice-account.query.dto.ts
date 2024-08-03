import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';

export class FindAllTeamInvoiceAccountQueryDto extends FindAllQueryDto<TeamInvoiceAccountDto> {
    keyword?: string;
}
