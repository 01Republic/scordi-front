// [SubscriptionDto] 과금 방식
export enum RecurringTypeOptions {
    NONE = 'NONE', // 무관 (기본값)
    PER_USAGE = 'PER_USAGE', // 사용량
    PER_SEAT = 'PER_SEAT', // 인원당
    PER_UNIT = 'PER_UNIT', // 건별결제
    FIXED = 'FIXED', // 고정요금
    // 라이센스
    // 크레딧
}
