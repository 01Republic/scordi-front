import {BasicModel} from '^models/BasicModel';
import {BillingScheduleShallowDto} from '^types/billing.type';
import {Currency, CurrencyList} from '^types/money.type';
import {groupBy, groupByDate, yyyy_mm_dd} from '^utils/dateTime';

export class BillingScheduleManager extends BasicModel<BillingScheduleShallowDto> {
    /**
     * Scoping Methods
     */

    validateToListing() {
        return this.isNotDead().filter<BillingScheduleManager>((record) => {
            if (!record.payAmount || record.payAmount.amount === 0) return false;

            return true;
        });
    }

    isDead() {
        return this.filter<BillingScheduleManager>((record) => record.isDead);
    }

    isNotDead() {
        return this.filter<BillingScheduleManager>((record) => !record.isDead);
    }

    isOverdue() {
        return this.filter<BillingScheduleManager>((record) => record.isOverdue);
    }

    isNotOverdue() {
        return this.filter<BillingScheduleManager>((record) => !record.isOverdue);
    }

    /**
     * Final Methods (returning non-chainable value)
     */
    getTotalPrice(currency = Currency.KRW) {
        const dollars = this.map((schedule) => schedule.payAmount?.dollar || 0);
        const priceSum = dollars.reduce((a, b) => a + b, 0);
        const item = Object.values(CurrencyList).find((item) => item.code === currency);
        return priceSum * (item?.exchangeRate || 1);
    }

    groupByBillingDateYMD() {
        return groupBy(this.list, (sch) => yyyy_mm_dd(sch.billingDate));
    }
}
