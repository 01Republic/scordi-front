import {api} from '^api/api';
import {DashboardDaySumDto, DashboardSummaryDto, SummaryOfBillingHistoriesDto} from '^types/dashboard.type';
import {GetBillingHistoriesParams} from '^types/billing.type';

const NAMESPACE = 'dashboard';

export const getDashboardSummary = (organizationId: number, year: number, month: number) => {
    return api.get<DashboardSummaryDto>(`/${NAMESPACE}/${organizationId}/summary/${year}/${month}`);
};

export const getDashboardCalendar = (organizationId: number, year: number, month: number) => {
    return api.get<DashboardDaySumDto[]>(`/${NAMESPACE}/${organizationId}/calendar/${year}/${month}`);
};

export const getDashboardSummaryV3 = (organizationId: number, params: GetBillingHistoriesParams) => {
    return api.get<SummaryOfBillingHistoriesDto>(`/${NAMESPACE}/${organizationId}/billing_histories/summary`, {params});
};
