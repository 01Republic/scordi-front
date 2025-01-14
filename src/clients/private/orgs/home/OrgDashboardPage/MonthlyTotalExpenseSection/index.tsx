import {useExpenseSection} from './useExpenseSection';
import {DashboardLayout} from '../DashboardLayout';
import {ExpenseStatusTabContent} from './ExpenseStatusTabContent';
import {TeamScopeButton} from './TeamScopeButton';
import {ExpenseStatusTabs} from './ExpenseStatusTabs';
import {ExpenseSectionSummary} from './ExpenseSectionSummary';

export const MonthlyTotalExpenseSection = () => {
    const {teamId, setTeamId, teams, currentStatusTab, currentTabSubscriptions, changeTab, subscriptions, isLoading} =
        useExpenseSection();

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

                <ExpenseSectionSummary subscriptions={subscriptions} />

                <ExpenseStatusTabs
                    subscriptions={subscriptions}
                    currentStatusTab={currentStatusTab}
                    onChange={changeTab}
                />

                <ExpenseStatusTabContent currentStatusTab={currentStatusTab} subscriptions={currentTabSubscriptions} />
            </section>
        </DashboardLayout>
    );
};
