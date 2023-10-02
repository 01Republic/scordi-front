import {dateSortBy} from '^components/util/date';
import {Currency} from '^types/crawler';
import {BillingHistoryDto} from '^types/billing.type';
import {BasicModel} from '../BasicModel';
import {groupBy, groupByDate, monthBefore, yearBefore, yyyy_mm_dd} from '^utils/dateTime';
import {BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import {uniqWith} from 'lodash';

export class BillingHistoryManager extends BasicModel<BillingHistoryDto> {
    /**
     * Scoping Methods
     */

    validateToListing() {
        return this.filter<BillingHistoryManager>((his) => {
            // email parsing 으로 수집된 결제내역이 아니면, 별도 필터 없이 허용.
            if (!his.emailContent) return true;

            // email parsing 으로 수집된 결제내역이면,
            // 원본메일을 직접수신(수신자, 그룹메일, 참조 등)한 경우가 아니라, 전달받은 메일은 노출하지 않습니다.
            return his.emailContent.metadata.receiver;
        });
    }

    paymentOnly() {
        return this.filter<BillingHistoryManager>((his) => his.payAmount);
    }

    paid() {
        return this.filter<BillingHistoryManager>((his) => his.paidAt);
    }

    sortByIssue(method: 'ASC' | 'DESC') {
        return this.sort<BillingHistoryManager>(dateSortBy(method, (his) => new Date(his.issuedAt)));
    }

    oldestIssue = () => this.sortByIssue('ASC').first(1);
    latestIssue = () => this.sortByIssue('DESC').first(1);

    uniqByIdentity() {
        const newList = uniqWith(this.list, (a, b) => {
            return (
                a.organizationId === b.organizationId &&
                a.subscriptionId === b.subscriptionId &&
                a.issuedAt.getTime() === b.issuedAt.getTime()
            );
        });
        return this.asManager<BillingHistoryManager>(newList);
    }

    /**
     * Final Methods (returning non-chainable value)
     */

    getTotalPrice(displayCurrency = Currency.KRW) {
        const priceList = this.map((history) => history.getPriceIn(displayCurrency));
        return priceList.reduce((a, b) => a + b, 0);
    }

    groupByIssuedAt() {
        return groupByDate(this.list, (his) => new Date(his.issuedAt));
    }

    groupByIssuedAtYMD() {
        return groupBy(this.list, (his) => yyyy_mm_dd(his.issuedAt));
        // const grouped = groupBy(this.list, (his) => yyyy_mm_dd(his.issuedAt));
        // const newGrouped: Record<string, BillingHistoryDto[]> = {};
        // Object.entries(grouped).forEach(([ymd, list]) => {
        //     console.log('list', list);
        //     newGrouped[ymd] = uniqWith(list, (a, b) => {
        //         return a.organizationId === b.organizationId && a.subscriptionId === b.subscriptionId;
        //     });
        // });
        // return newGrouped;
    }

    toCalendarData() {
        return this.paid().uniqByIdentity().groupByIssuedAtYMD();
    }

    lastPaidHistory() {
        return this.paid().latestIssue().first(1).take();
    }

    inferBillingCycle() {
        const list = this.validateToListing().paymentOnly().sortByIssue('DESC');
        const ids = list.attrMap('id');
        const [last1, last2] = list.paid().all();

        const equal = (date1: Date, date2: Date) => yyyy_mm_dd(date1) === yyyy_mm_dd(date2);
        const checkMonth = (date1: Date, date2: Date) => equal(monthBefore(1, date1), date2);
        const checkYear = (date1: Date, date2: Date) => equal(yearBefore(1, date1), date2);

        const indexOfLatest = ids.findIndex((id) => id === last1.id);
        if (indexOfLatest === 0) {
            if (last2) {
                if (checkMonth(last1.issuedAt, last2.issuedAt)) {
                    return BillingCycleTerm.monthly;
                } else if (checkYear(last1.issuedAt, last2.issuedAt)) {
                    return BillingCycleTerm.yearly;
                } else {
                    //
                }
            } else {
                //
            }
        } else {
        }
    }
}
