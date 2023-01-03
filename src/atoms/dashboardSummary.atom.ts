import {atom} from 'recoil';
import {DashboardSummaryDto} from '^types/dashboard.type';

export const dashboardSummaryAtom = atom({
    key: '@dashboard/dashboardSummary',
    default: null as DashboardSummaryDto | null,
});
