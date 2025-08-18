// [SubscriptionDto] 결제 주기
export enum BillingCycleOptions {
    None = 'None', // 무관 (기본값)
    Monthly = 'Monthly', // 월결제
    Yearly = 'Yearly', // 연결제
    Onetime = 'Onetime', // 일회성
}

export const SubscriptionBillingCycleTypeValues = [
    BillingCycleOptions.None, // 무관 (기본값)
    BillingCycleOptions.Monthly, // 월결제
    BillingCycleOptions.Yearly, // 연결제
    BillingCycleOptions.Onetime, // 일회성
];

export function t_SubscriptionBillingCycleType(value: BillingCycleOptions, short = false, t?: (key: string) => string) {
    return getBillingCycleTypeText(value, short, t);
}

// 백워드 호환성을 위한 fallback 함수
export function getBillingCycleTypeText(value: BillingCycleOptions, short = false, t?: (key: string) => string) {
    if (t) {
        switch (value) {
            case BillingCycleOptions.None:
                return short ? t('billingCycle.short.none') : t('billingCycle.none');
            case BillingCycleOptions.Monthly:
                return short ? t('billingCycle.short.monthly') : t('billingCycle.monthly');
            case BillingCycleOptions.Yearly:
                return short ? t('billingCycle.short.yearly') : t('billingCycle.yearly');
            case BillingCycleOptions.Onetime:
                return short ? t('billingCycle.short.onetime') : t('billingCycle.onetime');
            default:
                return '-';
        }
    }

    // 기본 한국어 텍스트 (번역 함수가 없을 때)
    switch (value) {
        case BillingCycleOptions.None:
            return '무관';
        case BillingCycleOptions.Monthly:
            return short ? '매월' : '월결제';
        case BillingCycleOptions.Yearly:
            return short ? '매년' : '연결제';
        case BillingCycleOptions.Onetime:
            return short ? '단건' : '일회성';
        default:
            return '-';
    }
}

export function t_SubscriptionBillingCycleTiny(value: BillingCycleOptions, t?: (key: string) => string) {
    return getBillingCycleTinyText(value, t);
}

// 백워드 호환성을 위한 fallback 함수
export function getBillingCycleTinyText(value: BillingCycleOptions, t?: (key: string) => string) {
    if (t) {
        switch (value) {
            case BillingCycleOptions.None:
                return t('billingCycle.tiny.none');
            case BillingCycleOptions.Monthly:
                return t('billingCycle.tiny.monthly');
            case BillingCycleOptions.Yearly:
                return t('billingCycle.tiny.yearly');
            case BillingCycleOptions.Onetime:
                return t('billingCycle.tiny.onetime');
            default:
                return '-';
        }
    }

    // 기본 한국어 텍스트 (번역 함수가 없을 때)
    switch (value) {
        case BillingCycleOptions.None:
            return '무관';
        case BillingCycleOptions.Monthly:
            return '월';
        case BillingCycleOptions.Yearly:
            return '년';
        case BillingCycleOptions.Onetime:
            return '한번';
        default:
            return '-';
    }
}

export function c_SubscriptionBillingCycleType(value: BillingCycleOptions) {
    switch (value) {
        case BillingCycleOptions.None: // 무관
            return 'bg-gray-100';
        case BillingCycleOptions.Monthly: // 월결제
            return 'bg-scordi-100';
        case BillingCycleOptions.Yearly: // 연결제
            return 'bg-pink-200';
        case BillingCycleOptions.Onetime: // 일회성
            return 'bg-orange-200';
        default:
            return 'bg-gray-100';
    }
}
