import {TypeCast} from '^types/utils/class-transformer';
import {BankAccountDto} from '^models/BankAccount/type';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {BankAccountsStaticData, bankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';

/**
 * [codef] 연동된 은행 계좌
 */
export class CodefBankAccountDto {
    id: number; // ID
    accountId: number; // 계정 정보 FK
    bankAccountId: number | null; // 등록된 계좌 FK

    get number4() {
        return this.resAccountDisplay;
    }

    @TypeCast(() => Date) syncedStartDate: Date | null; // 연동된 거래내역 시작일시
    @TypeCast(() => Date) syncedEndDate: Date | null; // 연동된 거래내역 종료일시
    resOverdraftAcctYN: boolean | null; // 마이너스 통장 여부
    resAccountDisplay: string; // 계좌번호_표시용
    resLastTranDate: string | null; // 최종거래일
    resLoanKind: string | null; // 대출종류
    resLoanBalance: string | null; // 대출잔액
    resLoanStartDate: string | null; // 대출신규일
    resLoanEndDate: string | null; // 대출만기일
    resEarningsRate: string | null; // 수익률
    resAccountInvestedCost: string | null; // 투자원금
    resAccountLoanExecNo: string | null; // 대출실행번호
    resAccountLifetime: string | null; // 평생계좌번호
    resAccountEndDate: string | null; // 만기일
    resAccountStartDate: string | null; // 신규일
    resAccountNickName: string | null; // 계좌별칭
    resAccountCurrency: string; // 통화코드
    resAccountBalance: string; // 현재잔액
    resAccount: string; // 계좌번호

    get bankEndNumbers() {
        return this.resAccount.slice(-3);
    }

    resAccountDeposit: string; // 예금구분
    resAccountName: string; // 계좌명(종류)
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => CodefAccountDto) account?: CodefAccountDto; // 계정 정보
    @TypeCast(() => BankAccountDto) bankAccount?: BankAccountDto; // 등록된 계좌
    @TypeCast(() => CodefBillingHistoryDto) codefBillingHistories?: CodefBillingHistoryDto[]; // 코드에프 결제내역

    get company() {
        const param = this.account?.organization;
        return BankAccountsStaticData.findOne(param) as BankAccountsStaticData | undefined;
    }
}
