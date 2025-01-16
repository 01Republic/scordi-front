import {useExpenseSection} from './useExpenseSection';
import {DashboardSectionLayout} from '../DashboardSectionLayout';
import {ExpenseStatusTabContent} from './ExpenseStatusTabContent';
import {TeamScopeButtonGroup} from './TeamScopeButtonGroup';
import {ExpenseStatusTabs} from './ExpenseStatusTabs';
import {ExpenseSectionSummary} from './ExpenseSectionSummary';

export const MonthlyTotalExpenseSection = () => {
    const {
        selectedTeam,
        setTeam,
        teams,
        currentStatusTab,
        currentTabSubscriptions,
        changeTab,
        subscriptions,
        isLoading,
    } = useExpenseSection();

    return (
        <DashboardSectionLayout title="이달의 지출 총액" isLoading={isLoading}>
            <section className="w-full flex flex-col gap-10">
                <TeamScopeButtonGroup teams={teams?.items || []} selectedTeam={selectedTeam} onSelect={setTeam} />

                <ExpenseSectionSummary subscriptions={subscriptions} />

                <ExpenseStatusTabs
                    subscriptions={subscriptions}
                    currentStatusTab={currentStatusTab}
                    onChange={changeTab}
                />

                <ExpenseStatusTabContent currentStatusTab={currentStatusTab} subscriptions={currentTabSubscriptions} />
            </section>
        </DashboardSectionLayout>
    );
};
