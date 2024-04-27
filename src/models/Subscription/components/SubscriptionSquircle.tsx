import {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {ProductAvatarImg} from '^v3/share/ProductAvatar';
import {Squircle} from '^components/ui/Squircle';

interface SubscriptionSquircleProps {
    subscription: SubscriptionDto;
    onClick?: (subscription: SubscriptionDto) => any;
}

export const SubscriptionSquircle = memo((props: SubscriptionSquircleProps) => {
    const {subscription, onClick} = props;

    return (
        <Squircle text={subscription.product.name()} onClick={() => onClick && onClick(subscription)}>
            <ProductAvatarImg product={subscription.product} className="w-8 h-8" />
        </Squircle>
    );
});
SubscriptionSquircle.displayName = 'SubscriptionSquircle';
