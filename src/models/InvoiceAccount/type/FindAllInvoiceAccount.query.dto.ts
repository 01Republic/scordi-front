import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {InvoiceAccountDto} from './InvoiceAccount.dto';

export class FindAllInvoiceAccountQueryDto extends FindAllQueryDto<InvoiceAccountDto> {
    keyword?: string;
}
