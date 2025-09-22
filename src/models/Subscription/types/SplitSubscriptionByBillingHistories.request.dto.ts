export class SplitSubscriptionByBillingHistoriesRequestDto {
    targetSubscriptionId?: number; // 대상 구독 ID
    billingHistoryIds: number[]; // 빌링히스토리 ID 목록
}
