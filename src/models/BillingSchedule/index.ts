import {BasicModel} from '^models/BasicModel';
import {BillingScheduleShallowDto} from '^types/billing.type';

export class BillingSchedule extends BasicModel<BillingScheduleShallowDto> {
    /**
     * Scoping Methods
     */

    /**
     * Final Methods (returning non-chainable value)
     */
    getTotalPrice() {
        return this.attrSum('billingAmount');
    }
}
