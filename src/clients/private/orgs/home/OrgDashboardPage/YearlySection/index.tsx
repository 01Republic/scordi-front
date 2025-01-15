import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useYearlySubscriptionHistoryLogInDashboard} from '^models/BillingHistory/hook';
import {YearlySubscriptionsLogSection} from './YearlySubscriptionsLogSection';
import {YearlySubscriptionListSection} from './YearlySubscriptionListSection';
import {useYearlySubscriptionScheduleLogInDashboard} from '^models/BillingSchedule/hook';

export const YearlySection = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const {data: monthlyBillingHistories, isLoading: isLoadingLog} = useYearlySubscriptionHistoryLogInDashboard(orgId);
    const {data: monthlyBillingSchedule} = useYearlySubscriptionScheduleLogInDashboard(orgId);
    // const getThisYear = new Date().getFullYear();
    const getThisYear = 2024;

    const monthsInYear = Array.from({length: 12}, (_, i) => `${getThisYear}-${String(i + 1).padStart(2, '0')}`);

    const monthsHistoriesLog = monthsInYear.map((month) => {
        const paidExpense = monthlyBillingHistories?.map((subscription) => subscription.items);
        const payLog = paidExpense?.flat().filter((item) => item.issuedYearMonth.startsWith(month));
        return {month, items: payLog};
    });

    const monthsSubscriptionList = monthsInYear.map((month) => {
        const allItems =
            monthlyBillingHistories?.flatMap(({subscription, items}) => {
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
            <YearlySubscriptionsLogSection
                monthsHistoriesLog={monthsHistoriesLog}
                monthlyBillingSchedule={monthlyBillingSchedule}
            />
            <YearlySubscriptionListSection
                monthsSubscriptionList={monthsSubscriptionList}
                isLoadingLog={isLoadingLog}
            />
        </div>
    );
});
