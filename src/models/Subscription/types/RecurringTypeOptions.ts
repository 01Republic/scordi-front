// [SubscriptionDto] 과금 방식 (MeasureMethod 로 변경 희망)
export enum RecurringTypeOptions {
    NONE = 'NONE', // 무관 (기본값)
    PER_SEAT = 'PER_SEAT', // 인원당
    PER_USAGE = 'PER_USAGE', // 사용량
    PER_UNIT = 'PER_UNIT', // 건별결제
    FIXED = 'FIXED', // 고정요금
    LICENSE = 'LICENSE', // 라이센스
    CREDIT = 'CREDIT', // 크레딧
}

export const SubscriptionMeasureMethodValues = [
    RecurringTypeOptions.NONE, // 무관 (기본값)
    RecurringTypeOptions.PER_SEAT, // 인원당
    RecurringTypeOptions.PER_USAGE, // 사용량
    RecurringTypeOptions.PER_UNIT, // 건별결제
    RecurringTypeOptions.FIXED, // 고정요금
    RecurringTypeOptions.LICENSE, // 라이센스
    RecurringTypeOptions.CREDIT, // 크레딧
];

export function t_SubscriptionMeasureMethod(value: RecurringTypeOptions) {
    switch (value) {
        case RecurringTypeOptions.NONE:
            return '무관';
        case RecurringTypeOptions.PER_SEAT:
            return '인원당';
        case RecurringTypeOptions.PER_USAGE:
            return '사용량';
        case RecurringTypeOptions.PER_UNIT:
            return '건별결제';
        case RecurringTypeOptions.FIXED:
            return '고정요금';
        case RecurringTypeOptions.LICENSE:
            return '라이센스';
        case RecurringTypeOptions.CREDIT:
            return '크레딧';
        default:
            return '-';
    }
}

export function c_SubscriptionMeasureMethod(value: RecurringTypeOptions) {
    switch (value) {
        case RecurringTypeOptions.NONE: // 무관
            return 'bg-gray-100';
        case RecurringTypeOptions.PER_SEAT: // 인원당
            return 'bg-cyan-200';
        case RecurringTypeOptions.PER_USAGE: // 사용량
            return 'bg-orange-200';
        case RecurringTypeOptions.PER_UNIT: // 건별결제
            return 'bg-emerald-200';
        case RecurringTypeOptions.FIXED: // 고정요금
            return 'bg-sky-200';
        case RecurringTypeOptions.LICENSE: // 라이센스
            return 'bg-purple-200';
        case RecurringTypeOptions.CREDIT: // 크레딧
            return 'bg-pink-200';
        default:
            return 'bg-gray-100';
    }
}
