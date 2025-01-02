import {DashboardLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardLayout';
import {useYearlySubscriptionLogInDashboard} from '^models/BillingSchedule/hook';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {BarGraph} from '^clients/private/orgs/home/OrgDashboardPage/YearlySubscriptionsLogSection/BarGraph';
import {useEffect} from 'react';

interface YearlySubscriptionsLogSectionProps {}

export const YearlySubscriptionsLogSection = (props: YearlySubscriptionsLogSectionProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {data: monthlySubscriptionList} = useYearlySubscriptionLogInDashboard(orgId);

    const getThisYear = new Date().getFullYear();
    const monthsInYear = Array.from({length: 12}, (_, i) => `${getThisYear}-${String(i + 1).padStart(2, '0')}`);

    const paidExpense = monthlySubscriptionList?.map((subscription) => subscription.items);
    const paidExpenseSubscriptions = monthlySubscriptionList?.map((subscription) => subscription.subscription);

    const monthsData = monthsInYear.map((month) => {
        const itemList = paidExpense?.flat().filter((item) => item.issuedYearMonth.startsWith(month));
        return {month, items: itemList};
    });

    return (
        <DashboardLayout title="올해의 구독 현황" className="!w-2/3">
            <section className="w-full flex flex-col gap-10">
                <div className="flex gap-5">
                    <section className="w-full flex flex-col gap-3 border rounded-xl p-5">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-800 rounded-full" />
                            <p>2024년, 오늘 기준 구독 지출액</p>
                        </div>
                        <p className="font-bold text-28">5,000,000원</p>
                    </section>
                    <section className="w-full flex flex-col gap-3 border rounded-xl p-5">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-pink-200 rounded-full" />
                            <p>2024년, 예상 구독 지출액</p>
                        </div>
                        <p className="font-bold text-28">10,000,000원</p>
                    </section>
                </div>
                <BarGraph monthsData={monthsData} />
            </section>
        </DashboardLayout>
    );
};
