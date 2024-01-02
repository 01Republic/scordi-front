// [SubscriptionDto] 결제 주기
export enum BillingCycleOptions {
    None = 'None', // 무관 (기본값)
    Monthly = 'Monthly', // 월결제
    Yearly = 'Yearly', // 연결제
    Onetime = 'Onetime', // 일회성
}
