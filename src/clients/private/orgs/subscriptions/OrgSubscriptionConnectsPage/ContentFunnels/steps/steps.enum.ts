export enum Steps {
    Undef,

    // 유/무료 선택
    IsFreeTier,

    // 결제주기 선택
    RecurringCycle,

    // 구독정보 입력
    SubscriptionInfo,

    // 결제수단 설정
    PaymentMethod,

    // 청구서 수신 메일 설정
    InvoiceAccount,
}
