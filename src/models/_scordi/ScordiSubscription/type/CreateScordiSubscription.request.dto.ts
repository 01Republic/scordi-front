export class CreateScordiSubscriptionRequestDto {
    organizationId: number; // 조직 ID
    scordiPlanId: number; // 결제플랜 ID
    isActive?: boolean; // 활성화 여부
    startAt: Date | null; // 시작일
    startAtStr: string | null; // 시작일
    finishAt: Date | null; // 만료일
    finishAtStr: string | null; // 만료일
    nextSubscriptionId: number | null; // 다음으로 적용될 구독 (갱신)
}
