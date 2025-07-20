import {useExpenseSection} from './useExpenseSection';
import {DashboardSectionLayout} from '../DashboardSectionLayout';
import {ExpenseStatusTabContent} from './ExpenseStatusTabContent';
import {TeamScopeButtonGroup} from './TeamScopeButtonGroup';
import {ExpenseStatusTabs} from './ExpenseStatusTabs';
import {ExpenseSectionSummary} from './ExpenseSectionSummary';
import {useTranslation} from 'next-i18next';

export const MonthlyTotalExpenseSection = () => {
    const {summary, selectedTeam, setTeam, teams, currentStatusTab, changeTab, isLoading} = useExpenseSection();
    const {t} = useTranslation('dashboard');

    return (
        <DashboardSectionLayout title={t('sections.monthlySubscription')} isLoading={isLoading}>
            <section className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10">
                <TeamScopeButtonGroup teams={teams?.items || []} selectedTeam={selectedTeam} onSelect={setTeam} />

                <ExpenseSectionSummary summaryOfState={summary?.total} />

                <ExpenseStatusTabs summary={summary} currentStatusTab={currentStatusTab} onChange={changeTab} />
                <ExpenseStatusTabContent summary={summary} currentStatusTab={currentStatusTab} />
            </section>
        </DashboardSectionLayout>
    );
};
