// 이용상태 응답
export enum ReviewResponseSubscriptionUsingStatus {
    IN_USE = 'IN_USE',
    NO_USE = 'NO_USE',
    DONT_KNOW = 'DONT_KNOW',
}

export function t_reviewResponseSubscriptionUsingStatus(value: ReviewResponseSubscriptionUsingStatus) {
    return {
        [ReviewResponseSubscriptionUsingStatus.IN_USE]: '사용',
        [ReviewResponseSubscriptionUsingStatus.NO_USE]: '미사용',
        [ReviewResponseSubscriptionUsingStatus.DONT_KNOW]: '모름',
    }[value];
}
