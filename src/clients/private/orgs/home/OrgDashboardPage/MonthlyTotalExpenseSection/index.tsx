import {useExpenseSection} from './useExpenseSection';
import {DashboardSectionLayout} from '../DashboardSectionLayout';
import {ExpenseStatusTabContent} from './ExpenseStatusTabContent';
import {TeamScopeButtonGroup} from './TeamScopeButtonGroup';
import {ExpenseStatusTabs} from './ExpenseStatusTabs';
import {ExpenseSectionSummary} from './ExpenseSectionSummary';

export const MonthlyTotalExpenseSection = () => {
    const {summary, selectedTeam, setTeam, teams, currentStatusTab, changeTab, isLoading} = useExpenseSection();

    return (
        <DashboardSectionLayout title="이달의 구독 현황" isLoading={isLoading}>
            <section className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10">
                <TeamScopeButtonGroup teams={teams?.items || []} selectedTeam={selectedTeam} onSelect={setTeam} />

                <ExpenseSectionSummary summaryOfState={summary?.total} />

                <ExpenseStatusTabs summary={summary} currentStatusTab={currentStatusTab} onChange={changeTab} />
                <ExpenseStatusTabContent summary={summary} currentStatusTab={currentStatusTab} />
            </section>
        </DashboardSectionLayout>
    );
};
