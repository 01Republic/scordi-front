//대시보드 - 결제수단 섹션에서 워크스페이스 결제수단 목록 불러오기
import {FromToQueryDto} from '^types/billing.type';
import {useQuery} from '@tanstack/react-query';
import {dashboardApi} from '^models/_dashboard/api';
import {getToday} from '^utils/dateTime';

//대시보드 - 결제수단 섹션
export const useDashboardCreditCardsSectionResultDto = (orgId: number, params?: FromToQueryDto) => {
    const defaultFrom = new Date(getToday().getFullYear(), getToday().getMonth(), 1, 12);

    const finalParams: FromToQueryDto = {
        from: params?.from || defaultFrom,
        to: params?.to || getToday(),
    };

    return useQuery({
        queryKey: ['CreditCardsResult', orgId],
        queryFn: () => dashboardApi.creditCardsSection(orgId, finalParams).then((res) => res.data),
        enabled: !!orgId || !isNaN(orgId),
    });
};

//대시보드 - 청구서 계정 섹션
export const useDashboardInvoiceAccountsSectionResult = (orgId: number, params?: FromToQueryDto) => {
    const defaultFrom = new Date(getToday().getFullYear(), getToday().getMonth(), 1, 12);

    const finalParams: FromToQueryDto = {
        from: params?.from || defaultFrom,
        to: params?.to || getToday(),
    };

    return useQuery({
        queryKey: ['invoiceAccountsResult', orgId],
        queryFn: () => dashboardApi.invoiceAccountsSection(orgId, finalParams).then((res) => res.data),
        enabled: !!orgId || !isNaN(orgId),
    });
};

// 대시보드 - 올해의 구독 현황 섹션 월 별 구독 예상 금액 리스트 불러오기
export const useDashboardSummaryYearMonthlyResult = (orgId: number, year: number) => {
    return useQuery({
        queryKey: ['summaryYearMonthlyResult', orgId, year],
        queryFn: () => dashboardApi.summaryYearMonthly(orgId, year).then((res) => res.data),
        enabled: !!orgId || !isNaN(orgId),
    });
};
