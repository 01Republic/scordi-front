export class GetSummaryOfSubscriptionSpendsQueryDto {
    startDate?: Date; // 조회범위 시작날짜
    endDate?: Date; // 조회범위 종료날짜
    organizationId?: number; // 조직 ID
    teamId?: number; // 팀 ID
}
