import {api} from '^api/api';
import {DashboardDaySumDto, DashboardSummaryDto} from '^types/dashboard.type';

const NAMESPACE = 'dashboard';

export const getDashboardSummary = (organizationId: number, year: number, month: number) => {
    return api.get<DashboardSummaryDto>(`/${NAMESPACE}/${organizationId}/summary/${year}/${month}`);
};

export const getDashboardCalendar = (organizationId: number, year: number, month: number) => {
    return api.get<DashboardDaySumDto[]>(`/${NAMESPACE}/${organizationId}/calendar/${year}/${month}`);
};
