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

    getAverageCost(exchangeRate: number, displayCurrency = CurrencyCode.KRW) {
        const total = this.items.reduce((sum, item) => {
            const adjustedAmount =
                displayCurrency === CurrencyCode.KRW && item.code !== CurrencyCode.KRW
                    ? item.amount * exchangeRate
                    : item.amount;
            return sum + adjustedAmount;
        }, 0);

        return total / this.items.length;
    }

    getAverageCostToKRW(exchangeRate: number) {
        const total = this.items.reduce((sum, item) => {
            const amount = item.code === CurrencyCode.KRW ? item.amount : item.amount * exchangeRate;
            return sum + amount;
        }, 0);

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
}

// 구독의 월간 합계 금액 내역
export class BillingHistoriesMonthlySumBySubscriptionDto {
    @TypeCast(() => SubscriptionDto)
    subscription: SubscriptionDto;

    @TypeCast(() => BillingHistoriesMonthlySumItemDto)
    items: BillingHistoriesMonthlySumItemDto[];
}
