import React, {memo} from 'react';
import {DashboardSummaryYearMonthlyResultDto} from '^models/_dashboard/type';
import {PaidSubscriptionSpendItem} from './PaidSubscriptionSpendItem';

interface SubscriptionSpendsForYearProps {
    result?: DashboardSummaryYearMonthlyResultDto;
}

export const SubscriptionSpendsForYear = memo((props: SubscriptionSpendsForYearProps) => {
    const {result} = props;

    const totalAmount = result?.totalOnThisYear || 0;
    const getRatio = (amount: number) => (totalAmount ? (Math.floor(amount) / totalAmount) * 100 : 0);

    return (
        <ul className="w-full flex flex-col">
            {result?.subscriptionSpends.map((subscriptionSpend) => (
                <PaidSubscriptionSpendItem
                    key={subscriptionSpend.subscription.id}
                    amount={subscriptionSpend.amount}
                    ratio={getRatio(subscriptionSpend.amount)}
                    subscription={subscriptionSpend.subscription}
                />
            ))}
        </ul>
    );
});
SubscriptionSpendsForYear.displayName = 'SubscriptionSpendsForYear';
