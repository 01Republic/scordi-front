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
 * 추상 클래스
 */

// [추상] 구독의 특정 단위기간 합계 금액
abstract class BillingHistoriesSumItemDto {
    subscriptionId: number;
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

// [추상] 구독의 기간내 합계 금액 내역
abstract class BillingHistoriesSumBySubscriptionDto {
    @TypeCast(() => SubscriptionDto)
    subscription: SubscriptionDto;

    abstract items: BillingHistoriesSumItemDto[];

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
 * yearlySum : 구독의 연간 합계 금액 조회
 * ----------------------------------------
 */

// 구독의 '단위 년도' 합계 금액
class BillingHistoriesYearlySumItemDto extends BillingHistoriesSumItemDto {
    issuedYear: number;
}

// 구독의 연도별 합계 금액 내역
export class BillingHistoriesYearlySumBySubscriptionDto extends BillingHistoriesSumBySubscriptionDto {
    @TypeCast(() => BillingHistoriesYearlySumItemDto)
    items: BillingHistoriesYearlySumItemDto[];
}

/**
 * monthlySum : 구독의 월간 합계 금액 조회
 * ----------------------------------------
 */

// 구독의 '단위 월' 합계 금액
export class BillingHistoriesMonthlySumItemDto extends BillingHistoriesSumItemDto {
    issuedYearMonth: string;
}

// 구독의 월별 합계 금액 내역
export class BillingHistoriesMonthlySumBySubscriptionDto extends BillingHistoriesSumBySubscriptionDto {
    @TypeCast(() => BillingHistoriesMonthlySumItemDto)
    items: BillingHistoriesMonthlySumItemDto[];

    findOfMonth(year: number, month: number) {
        if (month < 1) return undefined;

        const targetMonth = new Date(year, month - 1);
        return this.items.find((item) => {
            const issuedMonth = new Date(`${item.issuedYearMonth} `);
            return issuedMonth.getTime() === targetMonth.getTime();
        });
    }
}
