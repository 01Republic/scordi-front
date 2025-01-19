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
    const {summary, currentStatusTab = BillingHistoryStatus.PayWait, onChange} = props;

    return (
        <div className="w-full grid grid-cols-3 gap-5">
            <ExpenseStatusTab
                status={BillingHistoryStatus.PayWait}
                currentStatus={currentStatusTab}
                onClick={onChange}
                summaryData={summary?.pending}
                activeBorderColorClass="border-orange-400"
                activeTextColorClass="text-orange-400"
                activeBgColorClass="bg-orange-100"
            />

            <ExpenseStatusTab
                status={BillingHistoryStatus.PaySuccess}
                currentStatus={currentStatusTab}
                onClick={onChange}
                summaryData={summary?.success}
                activeBorderColorClass="border-gray-400"
                activeTextColorClass="text-gray-400"
                activeBgColorClass="bg-gray-100"
            />

            <ExpenseStatusTab
                status={BillingHistoryStatus.PayFail}
                currentStatus={currentStatusTab}
                onClick={onChange}
                summaryData={summary?.failure}
                activeBorderColorClass="border-red-400"
                activeTextColorClass="text-red-400"
                activeBgColorClass="bg-red-100"
            />
        </div>
    );
});
