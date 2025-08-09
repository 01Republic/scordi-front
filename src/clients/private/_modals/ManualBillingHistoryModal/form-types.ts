import {CreateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/CreateBillingHistoryByManual.request.dto';
import {BillingHistoryStatus} from '^models/BillingHistory/type';

export interface ManualPaymentHistoryRegisterForm extends Partial<CreateBillingHistoryByManualRequestDto> {
    subscriptionId: number;
    billingHistoryStatus: BillingHistoryStatus;
    payDate: Date;
}
