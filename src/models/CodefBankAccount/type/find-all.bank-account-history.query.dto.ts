import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {RangeQueryDto} from '^models/CodefCard/type/range.query.dto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

export class FindAllBankAccountHistoryQueryDto extends FindAllQueryDto<CodefBankAccountDto> {
    sync?: boolean; // 코드에프 결제내역 api 병합 실행 여부
    range?: RangeQueryDto; // 코드에프 결제내역 조회범위
}
