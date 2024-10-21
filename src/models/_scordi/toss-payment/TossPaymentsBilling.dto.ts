import {TypeCast} from '^types/utils/class-transformer';
import {TossPaymentsCardDto} from './TossPaymentsCard.dto';

/**
 * 빌링키 등록 결과
 */
export class TossPaymentsBillingDto {
    mId: string;
    customerKey: string;
    @TypeCast(() => Date) authenticatedAt: Date;
    method: '카드';
    // private billingKey: string;
    cardCompany: string;
    cardNumber: string;
    @TypeCast(() => TossPaymentsCardDto) card: TossPaymentsCardDto;
}
