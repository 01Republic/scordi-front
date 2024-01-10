import {TypeCast} from '^types/utils/class-transformer';
import {CreateMoneyRequestDto} from '^models/Money';

export class CreateBillingHistoryRequestDtoV2 {
    @TypeCast(() => Date) paidAt: Date; // 결제일시
    @TypeCast(() => CreateMoneyRequestDto) payAmount: CreateMoneyRequestDto; // 결제금액
    @TypeCast(() => CreateMoneyRequestDto) abroadPayAmount?: CreateMoneyRequestDto; // 결제금액
    uid?: string; // UID
    creditCardId: number | null; // 카드
    invoiceUrl?: string | null; // 인보이스(파일) 주소
    memo?: string; // 메모
    isDomestic?: boolean; // 국내/해외 결제 여부
    isVATDeductible?: boolean; // 공제/불공제 여부
    @TypeCast(() => CreateMoneyRequestDto) vatAmount?: CreateMoneyRequestDto; // 부가세
}
