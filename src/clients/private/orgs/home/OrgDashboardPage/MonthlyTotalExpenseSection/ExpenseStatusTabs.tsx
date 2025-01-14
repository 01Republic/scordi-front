import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {SubscriptionManager} from '^models/Subscription/manager';
import {BillingHistoryStatus} from '^models/BillingHistory/type';
import {ExpenseStatusTab} from './ExpenseStatusTab';

interface ExpenseStatusProps {
    subscriptions: SubscriptionDto[];
    currentStatusTab?: BillingHistoryStatus;
    onChange: (tab: BillingHistoryStatus, subscriptions: SubscriptionDto[]) => any;
}

export const ExpenseStatusTabs = memo((props: ExpenseStatusProps) => {
    const {subscriptions, currentStatusTab = BillingHistoryStatus.PayWait, onChange} = props;

    return (
        <div className="w-full flex gap-5">
            <ExpenseStatusTab
                status={BillingHistoryStatus.PayWait}
                currentStatus={currentStatusTab}
                onClick={onChange}
                subscriptions={SubscriptionManager.init(subscriptions).pending().list}
                activeBorderColorClass="border-orange-400"
                activeTextColorClass="text-orange-400"
                activeBgColorClass="bg-orange-100"
            />

            <ExpenseStatusTab
                status={BillingHistoryStatus.PaySuccess}
                currentStatus={currentStatusTab}
                onClick={onChange}
                subscriptions={[
                    ...SubscriptionManager.init(subscriptions).success().list,
                    // ...SubscriptionManager.init(subscriptions).free().list,
                    // ...SubscriptionManager.init(subscriptions).none().list,
                ]}
                activeBorderColorClass="border-gray-400"
                activeTextColorClass="text-gray-400"
                activeBgColorClass="bg-gray-100"
            />

            <ExpenseStatusTab
                status={BillingHistoryStatus.PayFail}
                currentStatus={currentStatusTab}
                onClick={onChange}
                subscriptions={SubscriptionManager.init(subscriptions).failed().list}
                activeBorderColorClass="border-red-400"
                activeTextColorClass="text-red-400"
                activeBgColorClass="bg-red-100"
            />
        </div>
    );
});
