// 이용상태 응답
export enum ReviewResponseSubscriptionUsingStatus {
    IN_USE = 'IN_USE',
    NO_USE = 'NO_USE',
    DONT_KNOW = 'DONT_KNOW',
}

export function t_reviewResponseSubscriptionUsingStatus(value: ReviewResponseSubscriptionUsingStatus) {
    return {
        [ReviewResponseSubscriptionUsingStatus.IN_USE]: '써요',
        [ReviewResponseSubscriptionUsingStatus.NO_USE]: '안써요',
        [ReviewResponseSubscriptionUsingStatus.DONT_KNOW]: '몰라요',
    }[value];
}
