export enum PricingModelOptions {
    NONE = 'NONE', // 무관 (기본값)
    PER_SEAT = 'PER_SEAT', // 인원당
    PER_USAGE = 'PER_USAGE', // 사용량
    PER_UNIT = 'PER_UNIT', // 건별결제
    FIXED = 'FIXED', // 고정요금
    LICENSE = 'LICENSE', // 라이센스
    CREDIT = 'CREDIT', // 크레딧
}

export const PricingModelValues = [
    PricingModelOptions.NONE, // 무관 (기본값)
    PricingModelOptions.PER_SEAT, // 인원당
    PricingModelOptions.PER_USAGE, // 사용량
    PricingModelOptions.PER_UNIT, // 건별결제
    PricingModelOptions.FIXED, // 고정요금
    PricingModelOptions.LICENSE, // 라이센스
    PricingModelOptions.CREDIT, // 크레딧
];

export function t_SubscriptionPricingModel(value: PricingModelOptions, t?: (key: string) => string) {
    return getPricingModelText(value, t);
}

// 백워드 호환성을 위한 fallback 함수
export function getPricingModelText(value: PricingModelOptions, t?: (key: string) => string) {
    if (t) {
        switch (value) {
            case PricingModelOptions.NONE:
                return t('pricingModel.none');
            case PricingModelOptions.PER_SEAT:
                return t('pricingModel.perSeat');
            case PricingModelOptions.PER_USAGE:
                return t('pricingModel.perUsage');
            case PricingModelOptions.PER_UNIT:
                return t('pricingModel.perUnit');
            case PricingModelOptions.FIXED:
                return t('pricingModel.fixed');
            case PricingModelOptions.LICENSE:
                return t('pricingModel.license');
            case PricingModelOptions.CREDIT:
                return t('pricingModel.credit');
            default:
                return '-';
        }
    }

    // 기본 한국어 텍스트 (번역 함수가 없을 때)
    switch (value) {
        case PricingModelOptions.NONE:
            return '무관';
        case PricingModelOptions.PER_SEAT:
            return '인원당';
        case PricingModelOptions.PER_USAGE:
            return '사용량';
        case PricingModelOptions.PER_UNIT:
            return '건별결제';
        case PricingModelOptions.FIXED:
            return '고정요금';
        case PricingModelOptions.LICENSE:
            return '라이센스';
        case PricingModelOptions.CREDIT:
            return '크레딧';
        default:
            return '-';
    }
}

export function c_PricingModelValue(value: PricingModelOptions) {
    switch (value) {
        case PricingModelOptions.NONE: // 무관
            return 'bg-gray-100';
        case PricingModelOptions.PER_SEAT: // 인원당
            return 'bg-cyan-200';
        case PricingModelOptions.PER_USAGE: // 사용량
            return 'bg-orange-200';
        case PricingModelOptions.PER_UNIT: // 건별결제
            return 'bg-emerald-200';
        case PricingModelOptions.FIXED: // 고정요금
            return 'bg-sky-200';
        case PricingModelOptions.LICENSE: // 라이센스
            return 'bg-purple-200';
        case PricingModelOptions.CREDIT: // 크레딧
            return 'bg-pink-200';
        default:
            return 'bg-gray-100';
    }
}
