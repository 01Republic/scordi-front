import {TypeCast} from '^types/utils/class-transformer';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {captures} from '^utils/array';
import {CreditCardDto} from '^models/CreditCard/type';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';

/**
 * [codef] 연동된 카드
 */
export class CodefCardDto {
    // ID
    id: number;

    // 계정 정보 FK
    accountId: number;

    // 등록된 카드 FK
    creditCardId: number | null;

    // 연동된 결제내역 시작일시
    @TypeCast(() => Date) syncedStartDate: Date | null;

    // 연동된 결제내역 종료일시
    @TypeCast(() => Date) syncedEndDate: Date | null;

    // 카드번호
    resCardNo: string;

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

    // 카드명
    resCardName: string; // [카드명] or [카드명|발급사], (예: 참! 좋은친구카드_체크|IBK기업은행)

    // 카드구분
    resCardType: string; // (ex. 본인, 체크 비자, 본인 비자, 본인신용, 신용/본인, 체크/본인, 본인카드, 주카드, 부카드-가족)

    // 휴면카드여부
    isSleep: boolean | null; // ("N": false, "Y": true)

    // 교통카드 여부
    isTraffic: boolean | null;

    // 카드 이미지 링크
    resImageLink: string;

    // 유효기간 (만료일)
    resValidPeriod: string;

    // 발급일자 (최초 발급일자)
    resIssueDate: string | null;

    // 재발급일자 (최근 재발급일자)
    resReissueDate: string | null;

    // 상태 (카드상태)
    resState: string | null;

    // 생성일시
    @TypeCast(() => Date) createdAt: Date;

    // 수정일시
    @TypeCast(() => Date) updatedAt: Date;

    // 계정 정보
    @TypeCast(() => CodefAccountDto)
    account?: CodefAccountDto;

    // 등록된 카드
    @TypeCast(() => CreditCardDto)
    creditCard?: CreditCardDto;

    // 코드에프 결제내역
    @TypeCast(() => CodefBillingHistoryDto)
    codefBillingHistories?: CodefBillingHistoryDto[];
}

export class ConnectedCodefCardDto extends CodefCardDto {
    // 등록된 카드 FK
    creditCardId: number;

    // 등록된 카드
    @TypeCast(() => CreditCardDto)
    creditCard: CreditCardDto;
}
