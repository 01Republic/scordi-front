import {api} from '^api/api';
import {FromToQueryDto} from '^types/billing.type';
import {oneDtoOf} from '^types/utils/response-of';
import {
    GetSummaryOfSubscriptionSpendsQueryDto,
    DashboardSummaryYearMonthlyResultDto,
    DashboardCreditCardsSectionResultDto,
    DashboardInvoiceAccountsSectionResultDto,
} from '^models/_dashboard/type';
import {SummaryOfBillingHistoriesDto} from '^types/dashboard.type';

export const dashboardApi = {
    /**
     * 특정 년도에 대한 월간 서머리 *
     * - 올해의 구독 현황 섹션 데이터 조회
     */
    summaryYearMonthly(orgId: number, year: number) {
        const url = `/dashboard/${orgId}/summary/${year}`;
        const ResultDto = DashboardSummaryYearMonthlyResultDto;
        return api.get(url).then(oneDtoOf(ResultDto));
    },

    // 대시보드 - 주어진 기간에 대한 구독서비스 결제내역 요약 (총합/예정/완료/실패)
    summary(orgId: number, params: GetSummaryOfSubscriptionSpendsQueryDto) {
        const url = `/dashboard/${orgId}/billing_histories/summary`;
        const ResultDto = SummaryOfBillingHistoriesDto;
        return api.get(url, {params}).then(oneDtoOf(ResultDto));
    },

    // 결제수단 섹션 데이터 조회
    creditCardsSection(orgId: number, params: FromToQueryDto) {
        const url = `/dashboard/${orgId}/sections/credit-cards`;
        const ResultDto = DashboardCreditCardsSectionResultDto;
        return api.get(url, {params}).then(oneDtoOf(ResultDto));
    },

    // 청구서계정 섹션 데이터 조회
    invoiceAccountsSection(orgId: number, params: FromToQueryDto) {
        const url = `/dashboard/${orgId}/sections/invoice-accounts`;
        const ResultDto = DashboardInvoiceAccountsSectionResultDto;
        return api.get<DashboardInvoiceAccountsSectionResultDto>(url, {params}).then(oneDtoOf(ResultDto));
    },
};
