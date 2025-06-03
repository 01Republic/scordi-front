import {TypeCast} from '^types/utils/class-transformer';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {captures} from '^utils/array';
import {CreditCardDto} from '^models/CreditCard/type';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {todayOf, yesterdayOf, yyyy_mm_dd, yyyymmddToDate} from '^utils/dateTime';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';

/**
 * [codef] 연동된 카드
 */
export class CodefCardDto {
    id: number; // ID
    accountId: number; // 계정 정보 FK
    creditCardId: number | null; // 등록된 카드 FK
    @TypeCast(() => Date) syncedStartDate: Date | null; // 연동된 결제내역 시작일시
    @TypeCast(() => Date) syncedEndDate: Date | null; // 연동된 결제내역 종료일시
    resCardNo: string; // 카드번호

    get cardNumbers() {
        return captures(this.resCardNo, /(.{4})(.{4})(.{4})(.{4})/);
    }

    get number1(): string | undefined {
        return this.cardNumbers[0];
    }

    get number2(): string | undefined {
        return this.cardNumbers[1];
    }

    get number3(): string | undefined {
        return this.cardNumbers[2];
    }

    get number4(): string | undefined {
        return this.cardNumbers[3];
    }

    resCardName: string; // [카드명] or [카드명|발급사], (예: 참! 좋은친구카드_체크|IBK기업은행) // 카드명
    resCardType: string; // (ex. 본인, 체크 비자, 본인 비자, 본인신용, 신용/본인, 체크/본인, 본인카드, 주카드, 부카드-가족) // 카드구분
    isSleep: boolean | null; // ("N": false, "Y": true) // 휴면카드여부
    isTraffic: boolean | null; // 교통카드 여부
    resImageLink: string; // 카드 이미지 링크
    resValidPeriod: string; // 유효기간 (만료일)
    resIssueDate: string | null; // 발급일자 (최초 발급일자)
    resReissueDate: string | null; // 재발급일자 (최근 재발급일자)
    resState: string | null; // 상태 (카드상태)
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => CodefAccountDto) account?: CodefAccountDto; // 계정 정보
    @TypeCast(() => CreditCardDto) creditCard?: CreditCardDto; // 등록된 카드
    @TypeCast(() => CodefBillingHistoryDto) codefBillingHistories?: CodefBillingHistoryDto[]; // 코드에프 결제내역

    nextFetchHistoriesRange() {
        const startDate = (() => {
            if (this.syncedEndDate) return todayOf(this.syncedEndDate);
            if (this.resIssueDate) return yyyy_mm_dd(yyyymmddToDate(this.resIssueDate));
            return '2020-01-01';
        })();

        const endDate = yesterdayOf(new Date());

        return {startDate, endDate};
    }

    get company() {
        const param = this.account?.organization;
        return CardAccountsStaticData.findOne(param) as CardAccountsStaticData | undefined;
    }

    get isConnected() {
        return !!this.creditCardId;
    }
}

export class ConnectedCodefCardDto extends CodefCardDto {
    // 등록된 카드 FK
    creditCardId: number;

    // 등록된 카드
    @TypeCast(() => CreditCardDto)
    creditCard: CreditCardDto;
}
