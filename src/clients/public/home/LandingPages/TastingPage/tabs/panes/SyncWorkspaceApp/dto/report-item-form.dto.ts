import {CurrencyCode} from '^models/Money';

export enum RecurringType {
    Monthly = 'Monthly',
    Yearly = 'Yearly',
    Onetime = 'Onetime',
}

export enum CurrencyType {
    KRW = 'KRW',
    USD = 'USD',
}

export interface ReportItemFormDataDto {
    isFree?: boolean; // 무료 여부
    recurringType?: RecurringType; // 결제 주기
    isPerUser?: boolean; // 사용자당 결제 여부
    payAmount?: number; // 결제 금액
    currencyType?: CurrencyCode; // 화폐
}
