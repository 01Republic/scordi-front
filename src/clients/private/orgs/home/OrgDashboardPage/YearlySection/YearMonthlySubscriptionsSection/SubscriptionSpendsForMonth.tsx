import React, {memo} from 'react';
import {DashboardSummaryYearMonthlyItemDto} from '^models/_dashboard/type';
import {PaidSubscriptionSpendItem} from './PaidSubscriptionSpendItem';
import {NotPaidSubscriptionSpendItem} from './NotPaidSubscriptionSpendItem';

interface SubscriptionSpendsForMonthProps {
    monthlyItem: DashboardSummaryYearMonthlyItemDto;
    isLoading?: boolean;
}

export const SubscriptionSpendsForMonth = memo((props: SubscriptionSpendsForMonthProps) => {
    const {monthlyItem, isLoading} = props;

    const getRatio = (amount: number) => (Math.floor(amount) / monthlyItem.amount) * 100;

    return (
        <>
            <ul className="w-full flex flex-col">
                {monthlyItem.paidData?.subscriptionSpends.map((subscriptionSpend) => (
                    <PaidSubscriptionSpendItem
                        key={subscriptionSpend.subscription.id}
                        amount={subscriptionSpend.amount}
                        ratio={getRatio(subscriptionSpend.amount)}
                        subscription={subscriptionSpend.subscription}
                    />
                ))}
            </ul>

            <ul className="w-full flex flex-col">
                {monthlyItem.notPaidData?.subscriptionSpends.map((subscriptionSpend) => (
                    <NotPaidSubscriptionSpendItem
                        key={subscriptionSpend.subscription.id}
                        amount={subscriptionSpend.amount}
                        ratio={getRatio(subscriptionSpend.amount)}
                        subscription={subscriptionSpend.subscription}
                    />
                ))}
            </ul>
        </>
    );
});
SubscriptionSpendsForMonth.displayName = 'SubscriptionSpendsForMonth';
