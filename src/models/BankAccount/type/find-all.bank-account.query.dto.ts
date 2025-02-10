import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {BankAccountDto} from './BankAccount.dto';

export class FindAllBankAccountQueryDto extends FindAllQueryDto<BankAccountDto> {
    keyword?: string; // 키워드
}
