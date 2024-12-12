import {TypeCast} from '^types/utils/class-transformer';
import {rangeToArr} from '^utils/range';
import {CurrencyCode, MoneyDto} from '^models/Money';
import {SubscriptionDto} from '^models/Subscription/types';

export class BillingHistoryStatusDateRangeDto {
    @TypeCast(() => Date) firstIssuedAt: Date | null;
    @TypeCast(() => Date) lastIssuedAt: Date | null;

    get years() {
        const firstIssuedYear = (this.firstIssuedAt || new Date()).getFullYear();
        const lastIssuedYear = (this.lastIssuedAt || new Date()).getFullYear();
        return rangeToArr(firstIssuedYear, lastIssuedYear);
    }
}

/**
 * yearlySum : 구독의 연간 합계 금액 조회
 * ----------------------------------------
 */

// 구독의 당해년도 합계 금액
class BillingHistoriesYearlySumItemDto {
    subscriptionId: number;
    issuedYear: number;
    amount: number;
    symbol: MoneyDto['symbol'];
    code: MoneyDto['code'];

    getCurrentAmount(exchangeRate: number, displayCurrency = CurrencyCode.KRW) {
        const currentAmount =
            displayCurrency === CurrencyCode.KRW && this.code !== CurrencyCode.KRW
                ? this.amount * exchangeRate
                : this.amount;

        return currentAmount || 0;
    }
}

// 구독의 연간 합계 금액 내역
export class BillingHistoriesYearlySumBySubscriptionDto {
    @TypeCast(() => SubscriptionDto)
    subscription: SubscriptionDto;

    @TypeCast(() => BillingHistoriesYearlySumItemDto)
    items: BillingHistoriesYearlySumItemDto[];

    getCostSum(exchangeRate: number, displayCurrency = CurrencyCode.KRW) {
        return this.items.reduce((sum, item) => {
            if (displayCurrency === CurrencyCode.KRW && item.code !== CurrencyCode.KRW) {
                return sum + item.amount * exchangeRate;
            } else {
                return sum + item.amount;
            }
        }, 0);
    }

    getCostSumToKRW(exchangeRate: number) {
        return this.items.reduce((sum, item) => {
            if (item.code === CurrencyCode.KRW) {
                return sum + item.amount;
            } else {
                return sum + item.amount * exchangeRate;
            }
        }, 0);
    }

    getAverageCost(exchangeRate: number, displayCurrency = CurrencyCode.KRW) {
        const total = this.getCostSum(exchangeRate, displayCurrency);
        return total / this.items.length;
    }

    getAverageCostToKRW(exchangeRate: number) {
        const total = this.getCostSumToKRW(exchangeRate);
        return total / this.items.length;
    }
}

/**
 * monthlySum : 구독의 월간 합계 금액 조회
 * ----------------------------------------
 */

// 구독의 당해월 합계 금액
class BillingHistoriesMonthlySumItemDto {
    subscriptionId: number;
    issuedYearMonth: number;
    amount: number;
    symbol: MoneyDto['symbol'];
    code: MoneyDto['code'];

    getCurrentAmount(exchangeRate: number, displayCurrency = CurrencyCode.KRW) {
        const currentAmount =
            displayCurrency === CurrencyCode.KRW && this.code !== CurrencyCode.KRW
                ? this.amount * exchangeRate
                : this.amount;

        return currentAmount || 0;
    }
}

// 구독의 월간 합계 금액 내역
export class BillingHistoriesMonthlySumBySubscriptionDto {
    @TypeCast(() => SubscriptionDto)
    subscription: SubscriptionDto;

    @TypeCast(() => BillingHistoriesMonthlySumItemDto)
    items: BillingHistoriesMonthlySumItemDto[];

    getCostSum(exchangeRate: number, displayCurrency = CurrencyCode.KRW) {
        return this.items.reduce((sum, item) => {
            if (displayCurrency === CurrencyCode.KRW && item.code !== CurrencyCode.KRW) {
                return sum + item.amount * exchangeRate;
            } else {
                return sum + item.amount;
            }
        }, 0);
    }

    getCostSumToKRW(exchangeRate: number) {
        return this.items.reduce((sum, item) => {
            if (item.code === CurrencyCode.KRW) {
                return sum + item.amount;
            } else {
                return sum + item.amount * exchangeRate;
            }
        }, 0);
    }

    getAverageCost(exchangeRate: number, displayCurrency = CurrencyCode.KRW) {
        const total = this.getCostSum(exchangeRate, displayCurrency);
        return total / this.items.length;
    }

    getAverageCostToKRW(exchangeRate: number) {
        const total = this.getCostSumToKRW(exchangeRate);
        return total / this.items.length;
    }
}
