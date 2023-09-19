import {ProductDto} from '^types/product.type';
import {BillingHistoryDto} from '^types/billing.type';
import {SubscriptionDto} from '^types/subscription.type';
import {
    BillingCycleTerm,
    Locale,
    SubscriptionBillingCycleDto,
    t_BillingCycleTerm,
} from '^types/subscriptionBillingCycle.type';

export enum BillingType {
    monthly = 'MONTHLY',
    yearly = 'YEARLY',
    onetime = 'ONETIME',
    undefined = 'UNDEFINED',
}

export type UpdateInvoiceAppRequestDto = {
    isActive: boolean;
};

export type InvoiceAppDto = {
    id: number;
    invoiceAccountId: number;
    productId: number;
    isActive: boolean;
    billingType: BillingType; // 결제 유형 (BillingCycle과 같은 개념)
    createdAt: string; // 생성일시
    updatedAt: string; // 수정일시
    billingHistories: BillingHistoryDto[];
    product: ProductDto;
};

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
