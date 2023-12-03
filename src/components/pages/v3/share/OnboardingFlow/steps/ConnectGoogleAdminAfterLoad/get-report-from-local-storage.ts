import {ReportDto} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/dto/report.dto';

export function getReportFromLocalStorage() {
    if (typeof window === 'undefined') return;
    const reportFromLocalStorage = window.localStorage.getItem('report');
    if (!reportFromLocalStorage) return;
    try {
        return JSON.parse(reportFromLocalStorage) as ReportDto;
    } catch {
        return;
    }
}
