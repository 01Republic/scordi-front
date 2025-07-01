import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {SubscriptionManager} from '^models/Subscription/manager';
import {BillingHistoryStatus} from '^models/BillingHistory/type';
import {ExpenseStatusTab} from './ExpenseStatusTab';
import {SummaryOfBillingHistoriesDto, SummaryOfState} from '^types/dashboard.type';

interface ExpenseStatusProps {
    summary?: SummaryOfBillingHistoriesDto;
    currentStatusTab?: BillingHistoryStatus;
    onChange: (tab: BillingHistoryStatus, summaryData: SummaryOfState) => any;
}

export const ExpenseStatusTabs = memo((props: ExpenseStatusProps) => {
    const {summary, currentStatusTab = BillingHistoryStatus.PaySuccess, onChange} = props;

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 whitespace-nowrap text-14 lg:text-16">
            <ExpenseStatusTab
                status={BillingHistoryStatus.PaySuccess}
                currentStatus={currentStatusTab}
                onClick={onChange}
                summaryData={summary?.success}
                activeBorderColorClass="border-emerald-400"
                hoverBorderColorClass="hover:border-emerald-100"
                activeTextColorClass="text-emerald-400"
                activeBgColorClass="bg-emerald-100"
            />

            <ExpenseStatusTab
                status={BillingHistoryStatus.PayWait}
                currentStatus={currentStatusTab}
                onClick={onChange}
                summaryData={summary?.pending}
                activeBorderColorClass="border-orange-400"
                hoverBorderColorClass="hover:border-orange-100"
                activeTextColorClass="text-orange-400"
                activeBgColorClass="bg-orange-100"
            />

            <ExpenseStatusTab
                status={BillingHistoryStatus.PayFail}
                currentStatus={currentStatusTab}
                onClick={onChange}
                summaryData={summary?.failure}
                activeBorderColorClass="border-red-400"
                hoverBorderColorClass="hover:border-red-100"
                activeTextColorClass="text-red-400"
                activeBgColorClass="bg-red-100"
            />
        </div>
    );
});
