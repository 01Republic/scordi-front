import {memo} from 'react';
import {SubscriptionCard} from './SubscriptionCard';
import {SubscriptionDto} from '^models/Subscription/types';

interface SubscriptionCardListProps {
    items: SubscriptionDto[];
}

export const SubscriptionCardList = memo(function SubscriptionCardList(props: SubscriptionCardListProps) {
    const {items: subscriptions} = props;
    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {subscriptions.map((subscription, i) => (
                <SubscriptionCard subscription={subscription} key={i} />
            ))}
        </div>
    );
});
