import {dateSortBy} from '^components/util/date';
import {Currency} from '^types/crawler';
import {BillingHistoryDto, getTotalPriceOfEmails} from '^types/billing.type';
import {BasicModel} from '../BasicModel';
import {groupByDate} from '^utils/dateTime';

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

    sortByIssue(method: 'ASC' | 'DESC') {
        return this.sort<BillingHistoryManager>(dateSortBy(method, (his) => new Date(his.issuedAt)));
    }

    oldestIssue = () => this.sortByIssue('ASC').first(1);
    latestIssue = () => this.sortByIssue('DESC').first(1);

    /**
     * Final Methods (returning non-chainable value)
     */

    getTotalPrice(displayCurrency = Currency.KRW) {
        return getTotalPriceOfEmails(this.list, displayCurrency).totalPrice;
    }

    groupByIssuedAt() {
        return groupByDate(this.list, (his) => new Date(his.issuedAt));
    }

    lastPaidHistory() {
        return this.filter<BillingHistoryManager>((his) => his.paidAt)
            .latestIssue()
            .first(1)
            .take();
    }
}
