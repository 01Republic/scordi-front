export enum SubscriptionStatus {
    FREE_TRIAL_STARTED = 'FREE_TRIAL_STARTED',
    FREE_TRIAL_EXPIRED = 'FREE_TRIAL_EXPIRED',
    PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
    PAYMENT_PENDING = 'PAYMENT_PENDING',
    PAYMENT_FAILURE = 'PAYMENT_FAILURE',
    PAUSED = 'PAUSED',
    CANCELED = 'CANCELED',
}

export class SubscriptionStatusLabel {
    static FREE_TRIAL_STARTED = '무료 구독';
    static FREE_TRIAL_EXPIRED = '구독 만료';
    static PAYMENT_SUCCESS = '결제 완료';
    static PAYMENT_PENDING = '결제 예정';
    static PAYMENT_FAILURE = '결제 실패';
    static PAUSED = '일시정지';
    static CANCELED = '구독 취소';
}

export class SubscriptionStatusClassName {
    static FREE_TRIAL_STARTED = 'bg-fuchsia-200';
    static FREE_TRIAL_EXPIRED = 'bg-scordi-200';
    static PAYMENT_SUCCESS = 'bg-green-200';
    static PAYMENT_PENDING = 'bg-sky-200';
    static PAYMENT_FAILURE = 'bg-red-200';
    static PAUSED = 'bg-teal-200';
    static CANCELED = 'bg-orange-200';
}
