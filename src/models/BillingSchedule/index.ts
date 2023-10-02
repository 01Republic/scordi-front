import {BasicModel} from '^models/BasicModel';
import {BillingHistoryDto, BillingScheduleShallowDto} from '^types/billing.type';
import {Currency} from '^types/money.type';
import {groupBy, yyyy_mm_dd} from '^utils/dateTime';
import {dateSortBy} from '^components/util/date';
import {uniqWith} from 'lodash';

export class BillingScheduleManager extends BasicModel<BillingScheduleShallowDto> {
    /**
     * Scoping Methods
     */
    // exceptFor(billingHistories: BillingHistoryDto[]) {
    //     const lastPaidHistoryForSubscriptions: Record<number, BillingHistoryDto> = {};
    //     // const BillingHistory = BillingHistoryManager.init(billingHistories);
    //
    //     return this.sortByBillingDate('DESC').filter<BillingScheduleManager>((sch) => {
    //         const alreadyExists = !!lastPaidHistoryForSubscriptions[sch.subscriptionId];
    //
    //         lastPaidHistoryForSubscriptions[sch.subscriptionId] ||= billingHistories
    //             .filter((his) => his.subscriptionId === sch.subscriptionId)
    //             .sortByIssue('DESC')
    //             .take();
    //         return !alreadyExists;
    //     });
    // }

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

    uniqByIdentity() {
        const newList = uniqWith(this.list, (a, b) => {
            return (
                a.organizationId === b.organizationId &&
                a.subscriptionId === b.subscriptionId &&
                a.billingDate.getTime() === b.billingDate.getTime()
            );
        });
        return this.asManager<BillingScheduleManager>(newList);
    }

    /**
     * Final Methods (returning non-chainable value)
     */
    getTotalPrice(displayCurrency = Currency.KRW) {
        const priceList = this.map((schedule) => schedule.getPriceIn(displayCurrency));
        return priceList.reduce((a, b) => a + b, 0);
    }

    groupByBillingDateYMD() {
        return groupBy(this.list, (sch) => yyyy_mm_dd(sch.billingDate));
        // const grouped = groupBy(this.list, (sch) => yyyy_mm_dd(sch.billingDate));
        // const newGrouped: Record<string, BillingScheduleShallowDto[]> = {};
        // Object.entries(grouped).forEach(([ymd, list]) => {
        //     newGrouped[ymd] = uniqWith(list, (a, b) => {
        //         return a.organizationId === b.organizationId && a.subscriptionId === b.subscriptionId;
        //     });
        //     console.log('newGroupedYmd', newGrouped[ymd]);
        // });
        // return newGrouped;
    }

    toCalendarData() {
        return this.validateToListing().uniqByIdentity().groupByBillingDateYMD();
    }
}

/**
 * 날짜별로 결제내역과 겹치지 않는 결제예정내역만 추려냅니다. (결제예정내역은 일단 전부 가져와서 프론트에서 필터링 합니다. 그게 여기 입니다.)
 * @param groupedHistories
 * @param groupedSchedules
 */
export function exceptBilledSchedules(
    groupedHistories: Record<string, BillingHistoryDto[]>,
    groupedSchedules: Record<string, BillingScheduleShallowDto[]>,
): Record<string, BillingScheduleShallowDto[]> {
    const newGroup: Record<string, BillingScheduleShallowDto[]> = {};

    // 날짜별로 예정목록을 돌면서
    Object.entries(groupedSchedules).forEach(([billingDate, schedules]) => {
        // 이 날짜의 결제내역을 가져오고
        const histories = groupedHistories[billingDate] || [];

        // 예정 목록 중에 결제내역과 같은 구독항목이 발견되지 않는 것만 추린다. (같은날 겹치는 결제내역이 없는 것)
        const validSchedules = schedules.filter((sch) => {
            const matchedHistory = histories.find((his) => his.subscriptionId === sch.subscriptionId);
            return !matchedHistory;
        });

        // 만약 예정목록을 추려낸 결과, 남는게 있으면 새로운 그룹객체에 이 날짜를 담는다.
        if (validSchedules.length) {
            newGroup[billingDate] = validSchedules;
        }
    });

    return newGroup;
}
