import {PartialType} from '^types/utils/partial-type';
import {CreateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/CreateBillingHistoryByManual.request.dto';

export class UpdateBillingHistoryByManualRequestDto extends PartialType(CreateBillingHistoryByManualRequestDto) {}
