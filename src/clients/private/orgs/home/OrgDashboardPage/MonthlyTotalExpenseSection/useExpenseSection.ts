import {useState} from 'react';
import {useOrgIdParam} from '^atoms/common';
import {BillingHistoryStatus} from '^models/BillingHistory/type';
import {useTeamListInDashboardExpenseSection, useDashboardSummarySection} from '^models/_dashboard/hook';
import {TeamDto} from '^models/Team/type';
import {firstDayOfMonth} from '^utils/dateTime';

export const useExpenseSection = () => {
    const orgId = useOrgIdParam();
    const [selectedTeam, _setTeam] = useState<TeamDto>();
    const [baseDate, setBaseDate] = useState(new Date());
    const [currentStatusTab, setCurrentStatusTab] = useState(BillingHistoryStatus.PaySuccess);
    const [showMoreTeam, setShowMoreTeam] = useState(false);

    const {data: teams, isLoading: isTeamLoading} = useTeamListInDashboardExpenseSection(orgId);
    const {data: summary, isLoading: isSummaryLoading} = useDashboardSummarySection(orgId, {
        teamId: selectedTeam?.id,
        startDate: firstDayOfMonth(baseDate),
    });

    const setTeam = (team?: TeamDto) => {
        _setTeam(team);
        changeTab(BillingHistoryStatus.PaySuccess);
    };

    const changeTab = setCurrentStatusTab;

    return {
        summary,
        selectedTeam,
        setTeam,
        teams,
        currentStatusTab,
        changeTab,
        isLoading: isTeamLoading || isSummaryLoading,
        baseDate,
        setBaseDate,
        showMoreTeam,
        setShowMoreTeam,
    };
};
