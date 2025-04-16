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

export function c_reviewResponseSubscriptionUsingStatus(
    value: ReviewResponseSubscriptionUsingStatus,
): [string, string] {
    return {
        [ReviewResponseSubscriptionUsingStatus.IN_USE]: ['green-200', 'green-800'] as [string, string],
        [ReviewResponseSubscriptionUsingStatus.NO_USE]: ['red-200', 'red-800'] as [string, string],
        [ReviewResponseSubscriptionUsingStatus.DONT_KNOW]: ['orange-200', 'orange-800'] as [string, string],
    }[value];
}
