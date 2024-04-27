import {memo} from 'react';
import {SubscriptionSquircle} from '^models/Subscription/components/SubscriptionSquircle';
import {SubscriptionDto} from '^models/Subscription/types';

interface AppUnitProps {
    subscription: SubscriptionDto;
}

export const AppUnit = memo((props: AppUnitProps) => {
    const {subscription} = props;

    return (
        <div className="flex items-center justify-center">
            <SubscriptionSquircle subscription={subscription} />
        </div>
    );
});
AppUnit.displayName = 'AppUnit';
