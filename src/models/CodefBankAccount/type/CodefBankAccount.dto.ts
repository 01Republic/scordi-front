import {TypeCast} from '^types/utils/class-transformer';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {captures} from '^utils/array';
import {CreditCardDto} from '^models/CreditCard/type';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {todayOf, yesterdayOf, yyyy_mm_dd, yyyymmddToDate} from '^utils/dateTime';
import {BankAccountDto} from '^models/BankAccount/type';

/**
 * [codef] 연동된 계좌
 */
export class CodefBankAccountDto {
    // ID
    id: number;

    // 계정 정보 FK
    accountId: number;

    // 등록된 계좌
    bankAccountId: number | null;

    // 연동된 거래내역 시작일시
    @TypeCast(() => Date)
    syncedStartDate: Date | null;

    // 연동된 거래내역 종료일시
    @TypeCast(() => Date)
    syncedEndDate: Date | null;

    // 마이너스 통장 여부
    resOverdraftAcctYN: boolean | null;

    // 계좌번호_표시용
    resAccountDisplay: string;

    // 최종거래일
    resLastTranDate: string | null;

    // 대출종류
    resLoanKind: string | null;

    // 대출잔액
    resLoanBalance: string | null;

    // 대출신규일
    resLoanStartDate: string | null;

    // 대출만기일
    resLoanEndDate: string | null;

    // 수익률
    resEarningsRate: string | null;

    // 투자원금
    resAccountInvestedCost: string | null;

    // 대출실행번호
    resAccountLoanExecNo: string | null;

    // 평생계좌번호
    resAccountLifetime: string | null;

    // 만기일
    resAccountEndDate: string | null;

    // 신규일
    resAccountStartDate: string | null;

    // 계좌별칭
    resAccountNickName: string | null;

    // 통화코드
    resAccountCurrency: string;

    // 현재잔액
    resAccountBalance: string;

    // 계좌번호
    resAccount: string;

    get bankEndNumbers() {
        return this.resAccount.slice(-3);
    }

    // 예금구분
    resAccountDeposit: string;

    // 계좌명(종류)
    resAccountName: string;

    // 생성일시
    @TypeCast(() => Date)
    createdAt: Date;

    // 수정일시
    @TypeCast(() => Date)
    updatedAt: Date;

    // 계정 정보
    @TypeCast(() => CodefAccountDto)
    account?: CodefAccountDto;

    // 등록된 계좌
    @TypeCast(() => BankAccountDto)
    bankAccount?: BankAccountDto;

    // 코드에프 결제내역
    @TypeCast(() => CodefBillingHistoryDto)
    codefBillingHistories?: CodefBillingHistoryDto[];
}
