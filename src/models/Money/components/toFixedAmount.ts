import {CurrencyCode} from '^models/Money';

export function toFixedAmount(amount: number, currencyCode: CurrencyCode, displayCurrency = CurrencyCode.KRW) {
    if (displayCurrency === CurrencyCode.KRW || currencyCode === CurrencyCode.KRW) {
        return Number(amount.toFixed(0));
    }

    return Number(amount.toFixed(2));
}

export function ratioOf(num: number, total: number) {
    if (total === 0) return 0;
    return (num / total) * 100;
}
