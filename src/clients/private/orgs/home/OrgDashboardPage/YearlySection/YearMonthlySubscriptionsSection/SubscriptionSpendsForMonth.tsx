import React, {memo} from 'react';
import {DashboardSummaryYearMonthlyItemDto} from '^models/_dashboard/type';
import {PaidSubscriptionSpendItem} from './PaidSubscriptionSpendItem';

interface SubscriptionSpendsForMonthProps {
    monthlyItem: DashboardSummaryYearMonthlyItemDto;
    isLoading?: boolean;
}

export const SubscriptionSpendsForMonth = memo((props: SubscriptionSpendsForMonthProps) => {
    const {monthlyItem, isLoading} = props;

    return (
        <>
            <ul className="w-full flex flex-col">
                {monthlyItem.paidData?.subscriptionSpends.map((subscriptionSpend) => (
                    <PaidSubscriptionSpendItem
                        key={subscriptionSpend.subscription.id}
                        amount={subscriptionSpend.amount}
                        subscription={subscriptionSpend.subscription}
                    />
                ))}
            </ul>
        </>
    );
});
SubscriptionSpendsForMonth.displayName = 'SubscriptionSpendsForMonth';
