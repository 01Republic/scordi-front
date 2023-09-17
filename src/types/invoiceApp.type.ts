import {ProductDto} from '^types/product.type';
import {BillingHistoryDto} from '^types/billing.type';
import {SubscriptionDto} from '^types/subscription.type';
import {Locale, SubscriptionBillingCycleDto, t_BillingCycleTerm} from '^types/subscriptionBillingCycle.type';

export enum BillingType {
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
    ONETIME = 'onetime',
    UNDEF = 'undef',
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
        case BillingType.MONTHLY:
            return '매월';
        case BillingType.YEARLY:
            return '매년';
        case BillingType.ONETIME:
            return '1회';
        case BillingType.UNDEF:
            return '무관';
    }
}

export function getBillingType(item: InvoiceAppDto | SubscriptionDto): string {
    if (Object.hasOwn(item, 'billingType')) {
        return t_BillingType((item as InvoiceAppDto).billingType) || '?';
    } else {
        const cycle = ((item as SubscriptionDto).billingCycle || {}) as SubscriptionBillingCycleDto;
        return t_BillingCycleTerm(cycle.term) || '?';
    }
}

// export function t_BillingType
