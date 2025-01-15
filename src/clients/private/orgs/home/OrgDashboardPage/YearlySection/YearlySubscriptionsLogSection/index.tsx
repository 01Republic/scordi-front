import {DashboardLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardLayout';
import {BarGraph} from '^clients/private/orgs/home/OrgDashboardPage/YearlySection/YearlySubscriptionsLogSection/BarGraph';
import {BillingHistoriesMonthlySumItemDto} from '^models/BillingHistory/type';
import {memo} from 'react';

import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {currencyFormat, roundNumber} from '^utils/number';
import {DashboardSummaryYearMonthlyResultDto} from '^models/_dashboard/type';

interface YearlySubscriptionsLogSectionProps {
    monthsHistoriesLog: {month: string; items: BillingHistoriesMonthlySumItemDto[] | undefined}[];
    monthlyBillingSchedule: DashboardSummaryYearMonthlyResultDto | undefined;
}

export const YearlySubscriptionsLogSection = memo((props: YearlySubscriptionsLogSectionProps) => {
    const {monthsHistoriesLog, monthlyBillingSchedule} = props;
    const getThisYear = new Date().getFullYear();

    return (
        <DashboardLayout title="올해의 구독 현황" className="!w-2/3">
            <section className="w-full flex flex-col gap-10">
                <div className="flex gap-5">
                    <section className="w-full flex flex-col gap-3 border rounded-xl p-5">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-800 rounded-full" />
                            <p>{`${getThisYear}년, 오늘 기준 구독 지출액`}</p>
                        </div>
                        <p className="font-bold text-28">
                            {monthlyBillingSchedule
                                ? currencyFormat(roundNumber(monthlyBillingSchedule?.didPayAmount))
                                : '0원'}
                        </p>
                    </section>
                    <section className="w-full flex flex-col gap-3 border rounded-xl p-5">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-pink-200 rounded-full" />
                            <p>{`${getThisYear}년, 예상 구독 지출액`}</p>
                        </div>
                        <p className="font-bold text-28">
                            {monthlyBillingSchedule
                                ? currencyFormat(roundNumber(monthlyBillingSchedule?.willPayAmount))
                                : '0원'}
                        </p>
                    </section>
                </div>
                <BarGraph monthsHistoriesLog={monthsHistoriesLog} monthlyBillingSchedule={monthlyBillingSchedule} />
            </section>
        </DashboardLayout>
    );
});
