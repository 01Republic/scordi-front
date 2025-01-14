import {TypeCast} from '^types/utils/class-transformer';
import {SubscriptionDto} from '^models/Subscription/types';

export class DashboardSummaryYearMonthlyDataDto {
    organizationId: number; // 조직 ID
    year: number; // 년
    month: number; // 월
    amount: number; // 합계 금액
    serviceCount: number; // 서비스 갯수
}

export class DashboardSummaryYearMonthlyItemDto {
    organizationId: number; // 조직 ID
    year: number; // 년
    month: number; // 월
    amount: number; // 합계 금액
    serviceCount: number; // 서비스 갯수

    // 결제 완료 데이터
    @TypeCast(() => DashboardSummaryYearMonthlyDataDto)
    paidData: DashboardSummaryYearMonthlyDataDto | null;

    // 결제 예정 데이터
    @TypeCast(() => DashboardSummaryYearMonthlyDataDto)
    notPaidData: DashboardSummaryYearMonthlyDataDto;
}

// 대시보드 / 올해의 구독 현황 섹션 응답결과
export class DashboardSummaryYearMonthlyResultDto {
    didPayAmount: number; // 오늘까지 결제한 금액
    willPayAmount: number; // 남은 결제 금액
    totalOnThisYear: number; // 연간 총 예상 비용 (결제한 금액 + 남은 결제 금액)

    // 월간 구독 지출 종합 내역
    @TypeCast(() => DashboardSummaryYearMonthlyItemDto)
    items: DashboardSummaryYearMonthlyItemDto[];

    // 지출되는 구독 목록
    @TypeCast(() => SubscriptionDto)
    subscriptions?: SubscriptionDto[];
}
