type DashboardSummaryDto = {
  total: number; // 이번달 총 비용
  didPayAmount: number; // 오늘까지 결제한 금액
  willPayAmount: number; // 남은 결제 금액
  totalOnLastMonth: number; // 지난달 총 결제액
  totalOnThisYear: number; // 연간 총 예상 비용
}
