export class SplitSubscriptionBySeatsRequestDto {
    targetSubscriptionId?: number; // 대상 구독 ID
    seatIds: number[]; // 시트 ID 목록
}
