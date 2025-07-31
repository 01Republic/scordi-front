import {PartialType} from '^types/utils/partial-type';
import {CreateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/CreateBillingHistoryByManual.request.dto';

export class UpdateBillingHistoryByManualRequestDto extends PartialType(CreateBillingHistoryByManualRequestDto) {
    // 변경할 구독 ID
    subscriptionId?: number;
}
