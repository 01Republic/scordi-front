import {CurrencyDto} from '^types/crawler';

export type DashboardSummaryDto = {
    total: number; // 이번달 총 비용
    didPayAmount: number; // 오늘까지 결제한 금액
    willPayAmount: number; // 남은 결제 금액
    totalOnLastMonth: number; // 지난달 총 결제액
    totalOnThisYear: number; // 연간 총 예상 비용
    activeApps: any[]; //TODO: 나중에 수정
    spendingApps: any[]; //TODO: 나중에 수정
    memberships: any[]; //TODO: 나중에 수정
};

export type DashboardDaySumDto = {
    date: string; // 날짜
    year: number; // 년도
    month: number; // 월
    day: number; // 일
    amount: number; // 금액
    serviceCount: number; // 서비스 개수
};

export type SummaryOfState = {
    count: number;
    amount: number;
};

export type SummaryOfBillingHistoriesDto = {
    startDate: Date | null;
    endDate: Date | null;
    currency?: CurrencyDto['code'];
    total: SummaryOfState;
    pending: SummaryOfState;
    success: SummaryOfState;
    failure: SummaryOfState;
};
