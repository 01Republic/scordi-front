import {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {MoneyDto} from '^types/money.type';

interface SubscriptionStatusProps {
    subscription: SubscriptionDto;
    lastPaidAt: Date | null;
    nextPayDate: Date | null;
    nextPayAmount: MoneyDto | null;
}

export const SubscriptionStatus = memo((props: SubscriptionStatusProps) => {
    const {subscription, lastPaidAt, nextPayDate, nextPayAmount} = props;

    // console.log({lastPaidAt, nextPayDate, nextPayAmount});

    if (subscription.isFreeTier) {
        return <div className="badge text-14">무료</div>;
    }

    return (
        <div className="btn btn-xs !bg-green-200 !border-0 cursor-default">
            <span className="font-normal">결제완료</span>
        </div>
    );
});
SubscriptionStatus.displayName = 'SubscriptionStatus';
