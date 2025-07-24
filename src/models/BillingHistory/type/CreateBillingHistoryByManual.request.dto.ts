import {CurrencyCode} from '^models/Money';

export class CreateBillingHistoryByManualRequestDto {
    // 카드 ID
    creditCardId?: number;

    // 계좌 ID
    bankAccountId?: number;

    // 결제 완료 일시
    paidAt?: Date | null;

    // 최근 결제 요청 일시
    lastRequestedAt?: Date | null;

    // 결제금액
    payAmount: number;

    // 결제화폐
    payCurrency: CurrencyCode;
}
