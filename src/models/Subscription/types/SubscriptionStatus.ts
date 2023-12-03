export enum SubscriptionStatus {
    FREE_TRIAL_STARTED = 'FREE_TRIAL_STARTED',
    FREE_TRIAL_EXPIRED = 'FREE_TRIAL_EXPIRED',
    PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
    PAYMENT_PENDING = 'PAYMENT_PENDING',
    PAYMENT_FAILURE = 'PAYMENT_FAILURE',
    PAUSED = 'PAUSED',
    CANCELED = 'CANCELED',
}

export function t_SubscriptionStatus(status: SubscriptionStatus) {
    switch (status) {
        case SubscriptionStatus.FREE_TRIAL_STARTED:
            return '무료 구독';
        case SubscriptionStatus.FREE_TRIAL_EXPIRED:
            return '구독 만료';
        case SubscriptionStatus.PAYMENT_SUCCESS:
            return '결제 완료';
        case SubscriptionStatus.PAYMENT_PENDING:
            return '결제 예정';
        case SubscriptionStatus.PAYMENT_FAILURE:
            return '결제 실패';
        case SubscriptionStatus.PAUSED:
            return '일시 정지';
        case SubscriptionStatus.CANCELED:
            return '구독 취소';
    }
}

export function c_SubscriptionStatus(status: SubscriptionStatus) {
    switch (status) {
        case SubscriptionStatus.FREE_TRIAL_STARTED:
            return 'bg-fuchsia-200';
        case SubscriptionStatus.FREE_TRIAL_EXPIRED:
            return 'bg-scordi-200';
        case SubscriptionStatus.PAYMENT_SUCCESS:
            return 'bg-green-200';
        case SubscriptionStatus.PAYMENT_PENDING:
            return 'bg-sky-200';
        case SubscriptionStatus.PAYMENT_FAILURE:
            return 'bg-red-200';
        case SubscriptionStatus.PAUSED:
            return 'bg-teal-200';
        case SubscriptionStatus.CANCELED:
            return 'bg-orange-200';
    }
}

export function subscriptionStatusOptions() {
    return Object.values(SubscriptionStatus).map((status) => ({
        status,
        label: t_SubscriptionStatus(status),
        className: c_SubscriptionStatus(status),
    }));
}
