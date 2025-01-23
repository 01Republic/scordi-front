import React, {memo, useState} from 'react';
import {SubscriptionSquircle} from '^models/Subscription/components/SubscriptionSquircle';
import {SubscriptionDto} from '^models/Subscription/types';
import {ProductDto} from '^models/Product/type';
import {SubscriptionGroupModal} from '^clients/private/_modals/SubscriptionGroupModal';

interface AppUnitProps {
    product: ProductDto;
}

export const AppUnit = memo((props: AppUnitProps) => {
    const {product} = props;
    const {subscriptions = []} = product;
    const [isOpened, setIsOpened] = useState(false);

    const openSubscriptionSelectModal = () => {
        setIsOpened(true);
    };

    const moveToSubscriptionPage = (subscription: SubscriptionDto) => {
        console.log('subscription', subscription);
    };

    const subscription = subscriptions[0] as SubscriptionDto | undefined;

    if (!subscription) return <></>;

    return (
        <div className="flex items-center justify-center">
            <SubscriptionSquircle
                subscription={subscription}
                onClick={subscriptions.length > 1 ? openSubscriptionSelectModal : moveToSubscriptionPage}
                etcFlag={subscriptions.length > 1 ? subscriptions.length : undefined}
            />

            <SubscriptionGroupModal
                isOpened={isOpened}
                onClose={() => setIsOpened(false)}
                title={product.name()}
                subscriptions={subscriptions}
                onItemClick={moveToSubscriptionPage}
            />
        </div>
    );
});
AppUnit.displayName = 'AppUnit';
