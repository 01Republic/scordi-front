import {BasicModel} from '^models/BasicModel';
import {BillingHistoryDto, BillingScheduleShallowDto} from '^types/billing.type';
import {Currency, CurrencyList} from '^types/money.type';
import {groupBy, groupByDate, yyyy_mm_dd} from '^utils/dateTime';
import {BillingHistoryManager} from '^models/BillingHistory';
import {dateSortBy} from '^components/util/date';

export class BillingScheduleManager extends BasicModel<BillingScheduleShallowDto> {
    /**
     * Scoping Methods
     */
    exceptFor(BillingHistory: BillingHistoryManager) {
        const lastPaidHistoryForSubscriptions: Record<number, BillingHistoryDto> = {};
        return this.sortByBillingDate('DESC').filter<BillingScheduleManager>((sch) => {
            const alreadyExists = !!lastPaidHistoryForSubscriptions[sch.subscriptionId];
            lastPaidHistoryForSubscriptions[sch.subscriptionId] ||= BillingHistory.filter(
                (his) => his.subscriptionId === sch.subscriptionId,
            )
                .sortByIssue('DESC')
                .take();
            return !alreadyExists;
        });
    }

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

    sortByBillingDate(method: 'ASC' | 'DESC') {
        return this.sort<BillingScheduleManager>(dateSortBy(method, (record) => record.billingDate));
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
