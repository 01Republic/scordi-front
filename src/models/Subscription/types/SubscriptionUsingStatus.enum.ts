// 구독 상태 (신) - 미정, 무료, 유료, 해지
export enum SubscriptionUsingStatus {
    QUIT = 'QUIT', // 해지
    PAID = 'PAID', // 유료
    FREE = 'FREE', // 무료
    NONE = 'NONE', // 미정
}

export const SubscriptionUsingStatusValues = [
    SubscriptionUsingStatus.QUIT, // 해지
    SubscriptionUsingStatus.PAID, // 유료
    SubscriptionUsingStatus.FREE, // 무료
    SubscriptionUsingStatus.NONE, // 무관 (기본값)
];

// 구독상태 데이터값을 humanize
export function t_SubscriptionUsingStatus(status: SubscriptionUsingStatus) {
    return {
        [SubscriptionUsingStatus.QUIT]: '해지',
        [SubscriptionUsingStatus.PAID]: '유료',
        [SubscriptionUsingStatus.FREE]: '무료',
        [SubscriptionUsingStatus.NONE]: '미정',
    }[status || SubscriptionUsingStatus.NONE];
}

// 구독상태 color assign
export function c_SubscriptionUsingStatus(status: SubscriptionUsingStatus) {
    return {
        [SubscriptionUsingStatus.QUIT]: 'bg-red-200',
        [SubscriptionUsingStatus.PAID]: 'bg-green-200',
        [SubscriptionUsingStatus.FREE]: 'bg-cyan-200',
        [SubscriptionUsingStatus.NONE]: 'bg-gray-100',
    }[status || SubscriptionUsingStatus.NONE];
}

export function subscriptionUsingStatusOptions() {
    return Object.values(SubscriptionUsingStatus).map((status) => ({
        status,
        label: t_SubscriptionUsingStatus(status),
        className: c_SubscriptionUsingStatus(status),
    }));
}
