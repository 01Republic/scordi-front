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
    isFree: boolean;
    recurringType: RecurringType;
    isPerUser: boolean;
    payAmount: number;
    currencyType: CurrencyType;
}
