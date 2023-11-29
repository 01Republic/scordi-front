import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {subscriptionsForCurrentOrgState} from '^v3/V3OrgAppsPage/atom';
import {SubscriptionCard} from './SubscriptionCard';

export const SubscriptionCardList = memo(function SubscriptionCardList() {
    const subscriptions = useRecoilValue(subscriptionsForCurrentOrgState);
    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {subscriptions.map((subscription, i) => (
                <SubscriptionCard subscription={subscription} key={i} />
            ))}
        </div>
    );
});
