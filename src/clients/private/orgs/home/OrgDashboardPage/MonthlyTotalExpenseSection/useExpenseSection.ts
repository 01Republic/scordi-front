import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {BillingHistoryStatus} from '^models/BillingHistory/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {
    useTeamListInDashboardExpenseSection,
    useSubscriptionListInDashboardExpenseSection,
    useTeamSubscriptionListInDashboardExpenseSection,
} from '^models/_dashboard/hook';
import {getPaginatedItems} from '^types/utils/response-of';
import {TeamDto} from '^models/Team/type';
import {SubscriptionManager} from '^models/Subscription/manager';
import {orgIdParamState} from '^atoms/common';

export const useExpenseSection = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const [selectedTeam, setTeam] = useState<TeamDto>();
    const [currentStatusTab, setCurrentStatusTab] = useState<BillingHistoryStatus>();
    const [currentTabSubscriptions, setCurrentTabSubscriptions] = useState<SubscriptionDto[]>([]);

    const {data: teams, isLoading: isTeamLoading} = useTeamListInDashboardExpenseSection(orgId);
    const {data: pagedSubscription, isLoading: isSubscriptionLoading} = useSubscriptionListInDashboardExpenseSection(
        orgId,
        {
            where: {organizationId: orgId},
            relations: ['teamMembers'],
            order: {currentBillingAmount: {dollarPrice: 'DESC'}, isFreeTier: 'ASC', id: 'DESC'},
        },
    );

    const {data: pagedSubscriptionByTeam, isLoading: isTeamSubscriptionLoading} =
        useTeamSubscriptionListInDashboardExpenseSection(orgId, selectedTeam?.id || 0, {
            relations: ['teamMembers'],
            order: {currentBillingAmount: {dollarPrice: 'DESC'}, isFreeTier: 'ASC', id: 'DESC'},
        });

    const isLoading = isTeamLoading || isSubscriptionLoading || isTeamSubscriptionLoading;
    const subscriptions = !selectedTeam
        ? getPaginatedItems(pagedSubscription)
        : getPaginatedItems(pagedSubscriptionByTeam);

    useEffect(() => {
        if (!currentStatusTab && subscriptions.length) {
            setCurrentStatusTab(BillingHistoryStatus.PayWait);
            setCurrentTabSubscriptions(SubscriptionManager.init(subscriptions).pending().list);
        }
    }, [currentStatusTab, subscriptions]);

    return {
        selectedTeam,
        setTeam,
        teams,
        currentStatusTab,
        currentTabSubscriptions,
        changeTab: (tab: BillingHistoryStatus, subscriptions: SubscriptionDto[]) => {
            setCurrentStatusTab(tab);
            setCurrentTabSubscriptions(subscriptions);
        },
        subscriptions,
        isLoading,
    };
};
