// [SubscriptionDto] 구독 상태
export enum SubscriptionStatus {
    NONE = 'NONE', // 무관 (기본값)
    FREE_TRIAL_STARTED = 'FREE_TRIAL_STARTED', // 체험기간
    PAYMENT_SUCCESS = 'PAYMENT_SUCCESS', // 결제완료
    PAYMENT_PENDING = 'PAYMENT_PENDING', // 결제예정
    PAYMENT_FAILURE = 'PAYMENT_FAILURE', // 결제실패
    CANCELED = 'CANCELED', // 구독취소

    // 24.01.02, should be invisible options
    FREE_TRIAL_EXPIRED = 'FREE_TRIAL_EXPIRED', // 기간만료
    PAUSED = 'PAUSED', // 일시중지
}

export const SubscriptionStatusValues = [
    SubscriptionStatus.NONE, // 무관 (기본값)
    SubscriptionStatus.FREE_TRIAL_STARTED, // 체험기간
    SubscriptionStatus.PAYMENT_PENDING, // 결제완료
    SubscriptionStatus.PAYMENT_SUCCESS, // 결제예정
    SubscriptionStatus.PAYMENT_FAILURE, // 결제실패
    SubscriptionStatus.CANCELED, // 구독취소
];

// 구독상태 데이터값을 humanize
// Deprecated 된 값이라도, 타입에 존재하면 일단 유지해야 합니다.
export function t_SubscriptionStatus(status: SubscriptionStatus) {
    switch (status) {
        case SubscriptionStatus.NONE:
            return '무관';
        case SubscriptionStatus.FREE_TRIAL_STARTED:
            return '체험기간';
        case SubscriptionStatus.PAYMENT_SUCCESS:
            return '결제완료';
        case SubscriptionStatus.PAYMENT_PENDING:
            return '결제예정';
        case SubscriptionStatus.PAYMENT_FAILURE:
            return '결제실패';
        case SubscriptionStatus.CANCELED:
            return '구독취소';
        case SubscriptionStatus.FREE_TRIAL_EXPIRED:
            return '기간만료';
        case SubscriptionStatus.PAUSED:
            return '일시중지';
        default:
            return `-`;
    }
}

// 구독상태 color assign
// Deprecated 된 값이라도, 타입에 존재하면 일단 유지해야 합니다.
export function c_SubscriptionStatus(status: SubscriptionStatus) {
    switch (status) {
        case SubscriptionStatus.NONE:
            return 'bg-gray-100';
        case SubscriptionStatus.FREE_TRIAL_STARTED:
            return 'bg-cyan-200';
        case SubscriptionStatus.PAYMENT_SUCCESS:
            return 'bg-green-200';
        case SubscriptionStatus.PAYMENT_PENDING:
            return 'bg-emerald-200';
        case SubscriptionStatus.PAYMENT_FAILURE:
            return 'bg-red-200';
        case SubscriptionStatus.CANCELED:
            return 'bg-orange-200';
        case SubscriptionStatus.FREE_TRIAL_EXPIRED:
            return 'bg-pink-200';
        case SubscriptionStatus.PAUSED:
            return 'bg-sky-200';
        default:
            return 'bg-gray-100';
    }
}

export function subscriptionStatusOptions() {
    return Object.values(SubscriptionStatus).map((status) => ({
        status,
        label: t_SubscriptionStatus(status),
        className: c_SubscriptionStatus(status),
    }));
}
