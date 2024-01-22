import {CurrencyCode} from '^models/Money/type/CurrencyCode.enum';

export class CreateMoneyRequestDto {
    text: string; // 금액 관련 원본 텍스트
    amount: number; // 금액
    code: CurrencyCode; // 화폐 코드
    exchangeRate: number; // 환율
    exchangedCurrency: CurrencyCode; // 환율 기준 화폐 코드
}

export class CreateMoneyWithSubscriptionRequestDto {
    amount: number; // 금액
    currency: CurrencyCode; // 화폐 코드
}
