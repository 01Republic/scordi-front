import {api} from '^api/api';
import {DashboardDaySumDto, DashboardSummaryDto} from '^types/dashboard.type';

const NAMESPACE = 'dashboard';

export const getDashboardSummary = (year: number, month: number) => {
    return api.get<DashboardSummaryDto>(
        `/${NAMESPACE}/summary/${year}/${month}`,
    );
};

export const getDashboardCalendar = (year: number, month: number) => {
    return api.get<DashboardDaySumDto[]>(
        `/${NAMESPACE}/calendar/${year}/${month}`,
    );
};
