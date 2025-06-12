import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

export class FindAllBankAccountQueryDto<T = CodefBankAccountDto> extends FindAllQueryDto<T> {
    sync?: boolean;
    connected?: boolean; // 연결된 계좌만 필터 여부 (기본: 전체/ 참: 연결된계좌만/ 거짓: 신규계좌만) - where[codefBankAccountId] 와 함께 사용 불가
}

export class FindAllBankAccountAdminQueryDto<T = CodefBankAccountDto> extends FindAllQueryDto<T> {
    organizationId?: number;
}
