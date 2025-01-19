import {FromToQueryDto} from '^types/billing.type';
import {useQuery} from '@tanstack/react-query';
import {dashboardApi} from '^models/_dashboard/api';
import {firstDayOfMonth, getToday, monthAfter} from '^utils/dateTime';
import {FindAllSubscriptionsQuery} from '^models/Subscription/types';
import {subscriptionApi} from '^models/Subscription/api';
import {teamApi} from '^models/Team/api';
import {GetSummaryOfSubscriptionSpendsQueryDto} from '^models/_dashboard/type';

//대시보드 - 이달의 지출 총액 섹션에서 팀 목록 불러오기
export const useTeamListInDashboardExpenseSection = (orgId: number) => {
    return useQuery({
        queryKey: ['teamList', orgId],
        queryFn: () => teamApi.index(orgId).then((res) => res.data),
        enabled: !!orgId || !isNaN(orgId),
    });
};

//대시보드 - 이달의 지출 총액 섹션에서 팀 구독 목록 불러오기
// TODO: 대시보드 - 이달의 지출 총액 섹션에서 팀 구독 목록 불러오기 - 훅이 팀 구독의 지출집계를 반환하도록 수정해야 함.
export const useTeamSubscriptionListInDashboardExpenseSection = (
    orgId: number,
    teamId: number,
    params?: FindAllSubscriptionsQuery,
) => {
    return useQuery({
        queryKey: ['teamSubscriptionList', orgId, teamId],
        queryFn: () => {
            return teamApi.subscriptions.index(orgId, teamId, params).then((res) => res.data);
        },
        enabled: (!!orgId && !!teamId) || (!isNaN(orgId) && !!teamId),
    });
};

//대시보드 - 이달의 지출 총액 섹션에서 워크스페이스 구독 목록 불러오기
// TODO: 대시보드 - 이달의 지출 총액 섹션에서 워크스페이스 구독 목록 불러오기 - 훅이 구독의 지출집계를 반환하도록 수정해야 함.
export const useSubscriptionListInDashboardExpenseSection = (orgId: number, params?: FindAllSubscriptionsQuery) => {
    return useQuery({
        queryKey: ['subscriptionList', orgId],
        queryFn: () => subscriptionApi.index(params).then((res) => res.data),
        enabled: !!orgId || !isNaN(orgId),
    });
};

//대시보드 - 이달의 지출 총액 섹션
export const useDashboardSummarySection = (orgId: number, params: GetSummaryOfSubscriptionSpendsQueryDto) => {
    params.startDate ||= firstDayOfMonth();
    params.endDate ||= monthAfter(1, params.startDate);

    return useQuery({
        queryKey: ['subscriptionList', orgId, params],
        queryFn: () => dashboardApi.summary(orgId, params).then((res) => res.data),
        enabled: !!orgId || !isNaN(orgId),
    });
};

//대시보드 - 결제수단 섹션
export const useDashboardCreditCardsSectionResultDto = (orgId: number, params?: FromToQueryDto) => {
    const defaultParams: FromToQueryDto = {
        from: firstDayOfMonth(),
        to: getToday(),
    };

    return useQuery({
        queryKey: ['CreditCardsResult', orgId, params],
        queryFn: () => dashboardApi.creditCardsSection(orgId, params || defaultParams).then((res) => res.data),
        enabled: !!orgId || !isNaN(orgId),
    });
};

//대시보드 - 청구서 계정 섹션
export const useDashboardInvoiceAccountsSectionResult = (orgId: number, params?: FromToQueryDto) => {
    const defaultParams: FromToQueryDto = {
        from: firstDayOfMonth(),
        to: getToday(),
    };

    return useQuery({
        queryKey: ['invoiceAccountsResult', orgId, params],
        queryFn: () => dashboardApi.invoiceAccountsSection(orgId, params || defaultParams).then((res) => res.data),
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
