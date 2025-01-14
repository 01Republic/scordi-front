import {useEffect, useState} from 'react';
import {BillingHistoryStatus} from '^models/BillingHistory/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {
    useTeamListInDashboardExpenseSection,
    useTeamSubscriptionListInDashboardExpenseSection,
} from '^models/Team/hook';
import {useSubscriptionListInDashboardExpenseSection} from '^models/Subscription/hook';
import {getPaginatedItems} from '^types/utils/response-of';
import {SubscriptionManager} from '^models/Subscription/manager';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

export const useExpenseSection = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const [teamId, setTeamId] = useState(0);
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
        useTeamSubscriptionListInDashboardExpenseSection(orgId, teamId, {
            relations: ['teamMembers'],
            order: {currentBillingAmount: {dollarPrice: 'DESC'}, isFreeTier: 'ASC', id: 'DESC'},
        });

    const isLoading = isTeamLoading || isSubscriptionLoading || isTeamSubscriptionLoading;
    const subscriptions =
        teamId === 0 ? getPaginatedItems(pagedSubscription) : getPaginatedItems(pagedSubscriptionByTeam);

    useEffect(() => {
        if (!currentStatusTab && subscriptions.length) {
            setCurrentStatusTab(BillingHistoryStatus.PayWait);
            setCurrentTabSubscriptions(SubscriptionManager.init(subscriptions).pending().list);
        }
    }, [currentStatusTab, subscriptions]);

    return {
        teamId,
        setTeamId,
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
