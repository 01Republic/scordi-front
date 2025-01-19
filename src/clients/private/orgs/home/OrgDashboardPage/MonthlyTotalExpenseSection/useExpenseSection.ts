import {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {BillingHistoryStatus} from '^models/BillingHistory/type';
import {useTeamListInDashboardExpenseSection, useDashboardSummarySection} from '^models/_dashboard/hook';
import {TeamDto} from '^models/Team/type';
import {orgIdParamState} from '^atoms/common';

export const useExpenseSection = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const [selectedTeam, setTeam] = useState<TeamDto>();
    const [currentStatusTab, setCurrentStatusTab] = useState<BillingHistoryStatus>(BillingHistoryStatus.PayWait);

    const {data: teams, isLoading: isTeamLoading} = useTeamListInDashboardExpenseSection(orgId);
    const {data: summary, isLoading: isSummaryLoading} = useDashboardSummarySection(orgId, {teamId: selectedTeam?.id});

    return {
        summary,
        selectedTeam,
        setTeam,
        teams,
        currentStatusTab,
        changeTab: setCurrentStatusTab,
        isLoading: isTeamLoading || isSummaryLoading,
    };
};
