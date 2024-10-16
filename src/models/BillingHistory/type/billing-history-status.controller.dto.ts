import {TypeCast} from '^types/utils/class-transformer';
import {rangeToArr} from '^utils/range';
import {MoneyDto} from '^models/Money';
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
}

// 구독의 연간 합계 금액 내역
export class BillingHistoriesYearlySumBySubscriptionDto {
    @TypeCast(() => SubscriptionDto)
    subscription: SubscriptionDto;

    @TypeCast(() => BillingHistoriesYearlySumItemDto)
    items: BillingHistoriesYearlySumItemDto[];
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
