import React, {memo} from 'react';
import {DashboardSummaryYearMonthlyResultDto} from '^models/_dashboard/type';
import {PaidSubscriptionSpendItem} from './PaidSubscriptionSpendItem';

interface SubscriptionSpendsForYearProps {
    result?: DashboardSummaryYearMonthlyResultDto;
}

export const SubscriptionSpendsForYear = memo((props: SubscriptionSpendsForYearProps) => {
    const {result} = props;

    return (
        <ul className="w-full flex flex-col">
            {result?.subscriptionSpends.map((subscriptionSpend) => (
                <PaidSubscriptionSpendItem
                    key={subscriptionSpend.subscription.id}
                    amount={subscriptionSpend.amount}
                    subscription={subscriptionSpend.subscription}
                />
            ))}
        </ul>
    );
});
SubscriptionSpendsForYear.displayName = 'SubscriptionSpendsForYear';
