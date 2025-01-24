import {TypeCast} from '^types/utils/class-transformer';
import {SubscriptionDto} from '^models/Subscription/types';
import {FindAllQueryEntityDto} from '^types/utils/findAll.query.dto';

export class YearMonthQueryDto {
    year: number; // 연
    month?: number; // 월
}

export class FindAllSubscriptionSpendsQueryDto extends FindAllQueryEntityDto<DashboardSummarySubscriptionSpendDto> {
    from: Date; // 기간 시작일
    to: Date; // 기간 종료일
}

// 임의 기간에 대한 구독 단위 합계
export class DashboardSummarySubscriptionSpendDto {
    organizationId: number; // 조직 ID
    subscriptionId: number; // 구독 ID
    amount: number; // 합계 금액
    historyCount: number; // 집계 건수

    // 구독 목록
    @TypeCast(() => SubscriptionDto) subscription: SubscriptionDto;
}

// 대시보드 / 올해의 구독 현황 섹션 응답결과 - 구독 단위 월 합계
export class DashboardSummaryYearMonthlySubscriptionSpendDto {
    organizationId: number; // 조직 ID
    year: number; // 년
    month: number; // 월
    subscriptionId: number; // 구독 ID
    amount: number; // 합계 금액

    // 구독 목록
    @TypeCast(() => SubscriptionDto) subscription: SubscriptionDto;
}

// 대시보드 / 올해의 구독 현황 섹션 응답결과 - 구독 단위 연 합계
export class DashboardSummaryYearlySubscriptionSpendDto {
    organizationId: number; // 조직 ID
    year: number; // 년
    subscriptionId: number; // 구독 ID
    amount: number; // 합계 금액

    // 구독 목록
    @TypeCast(() => SubscriptionDto) subscription: SubscriptionDto;
}

// 대시보드 / 올해의 구독 현황 섹션 응답결과 - 월 종합 데이터
export class DashboardSummaryYearMonthlyDataDto {
    organizationId: number; // 조직 ID
    year: number; // 년
    month: number; // 월
    amount: number; // 합계 금액
    serviceCount: number; // 서비스 갯수

    // 구독 단위 월 지출 목록
    @TypeCast(() => DashboardSummaryYearMonthlySubscriptionSpendDto)
    subscriptionSpends: DashboardSummaryYearMonthlySubscriptionSpendDto[] = [];
}

// 대시보드 / 올해의 구독 현황 섹션 응답결과 - 월 종합
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
    notPaidData: DashboardSummaryYearMonthlyDataDto | null;
}

// 대시보드 / 올해의 구독 현황 섹션 응답결과
export class DashboardSummaryYearMonthlyResultDto {
    didPayAmount: number; // 오늘까지 결제한 금액
    willPayAmount: number; // 남은 결제 금액
    totalOnThisYear: number; // 연간 총 예상 비용 (결제한 금액 + 남은 결제 금액)

    // 월간 구독 지출 종합 내역
    @TypeCast(() => DashboardSummaryYearMonthlyItemDto)
    items: DashboardSummaryYearMonthlyItemDto[];

    @TypeCast(() => DashboardSummaryYearlySubscriptionSpendDto)
    subscriptionSpends: DashboardSummaryYearlySubscriptionSpendDto[] = [];
}
