import {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {OrganizationDto} from '^models/Organization/type';
import {
    useTeamListInDashboardExpenseSection,
    useTeamSubscriptionListInDashboardExpenseSection,
} from '^models/Team/hook';
import {useSubscriptionListInDashboardExpenseSection} from '^models/Subscription/hook';
import {SubscriptionManager} from '^models/Subscription/manager';
import {currencyFormat} from '^utils/number';
import {LoadableBox} from '^components/util/loading';
import {DashboardLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardLayout';
import {ExpenseSubscription} from './ExpenseSubscription';
import {TeamScopeButton} from './TeamScopeButton';
import {ExpenseStatus} from './ExpenseStatus';
import {CurrencyCode} from '^models/Money';

export type ExpenseStatusType = '예정' | '완료' | '실패';

export const MonthlyTotalExpenseSection = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const [teamId, setTeamId] = useState(0);
    const [expenseStatus, setExpenseStatus] = useState<ExpenseStatusType>('예정');

    const {data: teams, isLoading} = useTeamListInDashboardExpenseSection(orgId);
    const {data: subscriptions} = useSubscriptionListInDashboardExpenseSection(orgId, {
        where: {organizationId: orgId},
        relations: ['teamMembers'],
        order: {currentBillingAmount: {dollarPrice: 'DESC'}, isFreeTier: 'ASC', id: 'DESC'},
    });
    const {data: teamSubscriptionList} = useTeamSubscriptionListInDashboardExpenseSection(orgId, teamId);

    const workSpaceSubscriptions = subscriptions?.items ? subscriptions.items : [];
    const teamSubscriptions = teamSubscriptionList?.items ? teamSubscriptionList.items : [];

    const subscriptionAllList = teamId === 0 ? workSpaceSubscriptions : teamSubscriptions;
    const pendingAndSuccessList = [
        ...SubscriptionManager.init(subscriptionAllList).pending().list,
        ...SubscriptionManager.init(subscriptionAllList).success().list,
    ];

    const totalPrice = pendingAndSuccessList.reduce(
        (total, current) => total + (current.currentBillingAmount?.toDisplayPrice(displayCurrency) || 0),
        0,
    );

    const subscriptionExpenseStatusList =
        expenseStatus === '예정'
            ? SubscriptionManager.init(subscriptionAllList).pending().list
            : expenseStatus === '완료'
            ? [
                  ...SubscriptionManager.init(subscriptionAllList).success().list,
                  // ...SubscriptionManager.init(subscriptionAllList).free().list,
                  // ...SubscriptionManager.init(subscriptionAllList).none().list,
              ]
            : SubscriptionManager.init(subscriptionAllList).failed().list;

    return (
        <DashboardLayout title="이달의 지출 총액" isLoading={isLoading}>
            <section className="w-full flex flex-col gap-10">
                <div className="flex gap-2">
                    <TeamScopeButton text="전체" onClick={() => setTeamId(0)} active={teamId === 0} />
                    {teams?.items?.map((item) => (
                        <TeamScopeButton
                            key={item.id}
                            text={item.name}
                            onClick={() => setTeamId(item.id)}
                            active={teamId === item.id}
                        />
                    ))}
                </div>
                <p className="font-bold text-28">{`${currencyFormat(totalPrice)} · ${
                    pendingAndSuccessList.length
                }건`}</p>
                <ExpenseStatus
                    subscriptions={subscriptionAllList}
                    expenseStatus={expenseStatus}
                    setExpenseStatus={setExpenseStatus}
                />
                <ExpenseSubscription subscriptions={subscriptionExpenseStatusList} expenseStatus={expenseStatus} />
            </section>
        </DashboardLayout>
    );
};
