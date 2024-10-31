import {OmitType} from '^types/utils/omit-type';
import {TossPaymentsCreateBillingKeyByCustomerKeyRequestDto} from '^models/_scordi/toss-payment';

export class CreateScordiPaymentMethodByCustomerKeyRequestDto extends OmitType(
    TossPaymentsCreateBillingKeyByCustomerKeyRequestDto,
    ['customerKey'],
) {}
