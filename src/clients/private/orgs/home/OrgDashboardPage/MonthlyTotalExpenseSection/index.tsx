import {useExpenseSection} from './useExpenseSection';
import {DashboardSectionLayout} from '../DashboardSectionLayout';
import {ExpenseStatusTabContent} from './ExpenseStatusTabContent';
import {BaseDateHandler} from './BaseDateHandler';
import {TeamScopeButtonGroup} from './TeamScopeButtonGroup';
import {ExpenseStatusTabs} from './ExpenseStatusTabs';
import {ExpenseSectionSummary} from './ExpenseSectionSummary';

export const MonthlyTotalExpenseSection = () => {
    const {summary, selectedTeam, setTeam, teams, currentStatusTab, changeTab, isLoading, baseDate, setBaseDate} =
        useExpenseSection();

    return (
        <DashboardSectionLayout
            title="월간 구독 현황"
            isLoading={isLoading}
            Top={() => <BaseDateHandler baseDate={baseDate} onChange={setBaseDate} />}
            Middle={() => (
                <section className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10">
                    <TeamScopeButtonGroup teams={teams?.items || []} selectedTeam={selectedTeam} onSelect={setTeam} />

                    <ExpenseSectionSummary summaryOfState={summary?.total} />

                    <ExpenseStatusTabs summary={summary} currentStatusTab={currentStatusTab} onChange={changeTab} />
                </section>
            )}
        >
            <section className="w-full flex flex-col mt-6 md:mt-8 lg:mt-10">
                <ExpenseStatusTabContent summary={summary} currentStatusTab={currentStatusTab} />
            </section>
        </DashboardSectionLayout>
    );
};
