import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {YearlySubscriptionsLogSection} from '^clients/private/orgs/home/OrgDashboardPage/YearlySection/YearlySubscriptionsLogSection';
import {YearlySubscriptionListSection} from '^clients/private/orgs/home/OrgDashboardPage/YearlySection/YearlySubscriptionListSection';
import {orgIdParamState} from '^atoms/common';
import {useYearlySubscriptionLogInDashboard} from '^models/BillingSchedule/hook';

export const YearlySection = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const {data: monthlySubscriptionList} = useYearlySubscriptionLogInDashboard(orgId);

    // const getThisYear = new Date().getFullYear();
    const getThisYear = 2024;

    const monthsInYear = Array.from({length: 12}, (_, i) => `${getThisYear}-${String(i + 1).padStart(2, '0')}`);

    const monthsPayLog = monthsInYear.map((month) => {
        const paidExpense = monthlySubscriptionList?.map((subscription) => subscription.items);
        const payLog = paidExpense?.flat().filter((item) => item.issuedYearMonth.startsWith(month));
        return {month, items: payLog};
    });

    const monthsSubscriptionList = monthsInYear.map((month) => {
        const allItems =
            monthlySubscriptionList?.flatMap(({subscription, items}) => {
                if (!items) return [];
                return items.map((item) => ({...item, subscription}));
            }) || [];

        const subscriptionList = allItems.filter((item) => item.issuedYearMonth.startsWith(month));

        return {
            month,
            items: subscriptionList,
        };
    });

    return (
        <div className="flex gap-5">
            <YearlySubscriptionsLogSection monthsPayLog={monthsPayLog} />
            <YearlySubscriptionListSection monthsSubscriptionList={monthsSubscriptionList} orgId={orgId} />
        </div>
    );
});
