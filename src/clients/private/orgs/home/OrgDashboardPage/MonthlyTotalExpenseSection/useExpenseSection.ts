import {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {BillingHistoryStatus} from '^models/BillingHistory/type';
import {useTeamListInDashboardExpenseSection, useDashboardSummarySection} from '^models/_dashboard/hook';
import {TeamDto} from '^models/Team/type';
import {orgIdParamState} from '^atoms/common';

export const useExpenseSection = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const [selectedTeam, _setTeam] = useState<TeamDto>();
    const [currentStatusTab, setCurrentStatusTab] = useState(BillingHistoryStatus.PaySuccess);

    const {data: teams, isLoading: isTeamLoading} = useTeamListInDashboardExpenseSection(orgId);
    const {data: summary, isLoading: isSummaryLoading} = useDashboardSummarySection(orgId, {teamId: selectedTeam?.id});

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
    };
};
