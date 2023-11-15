import {ProductDto} from '^models/Product/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {
    BillingCycleTerm,
    Locale,
    SubscriptionBillingCycleDto,
    t_BillingCycleTerm,
} from '^models/Subscription/types/billingCycleType';
import {TypeCast} from '^types/utils/class-transformer';
import {BillingHistoryDto} from '^models/BillingHistory/type';

export enum BillingType {
    // MONTHLY = 'monthly',
    // YEARLY = 'yearly',
    // ONETIME = 'onetime',
    // UNDEF = 'undef',
    monthly = 'MONTHLY',
    yearly = 'YEARLY',
    onetime = 'ONETIME',
    undefined = 'UNDEFINED',
}

export type UpdateInvoiceAppRequestDto = {
    isActive: boolean;
};

export class InvoiceAppDto {
    id: number;
    invoiceAccountId: number;
    productId: number;
    isActive: boolean;
    billingType: BillingType; // 결제 유형 (BillingCycle과 같은 개념)
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    // relations
    @TypeCast(() => ProductDto) product: ProductDto;
    @TypeCast(() => BillingHistoryDto) billingHistories: BillingHistoryDto[];
}

// 인보이스 앱에서 결제주기 텍스트 추출
export function t_BillingType(v: BillingType | null, standalone = false, locale = Locale.ko) {
    switch (v) {
        case null:
            return '무관';
        case BillingType.monthly:
            return '매월';
        case BillingType.yearly:
            return '매년';
        case BillingType.onetime:
            return '1회';
        case BillingType.undefined:
            return '무관';
    }
}

export function billingTypeToCycleTerm(v: BillingType | null) {
    switch (v) {
        case BillingType.monthly:
            return BillingCycleTerm.monthly;
        case BillingType.yearly:
            return BillingCycleTerm.yearly;
        default:
            return null; // 1회성
    }
}
