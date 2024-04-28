import {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {ProductAvatarImg} from '^v3/share/ProductAvatar';
import {Squircle} from '^components/ui/Squircle';

interface SubscriptionSquircleProps {
    subscription: SubscriptionDto;
    onClick?: (subscription: SubscriptionDto) => any;
    etcFlag?: number;
}

export const SubscriptionSquircle = memo((props: SubscriptionSquircleProps) => {
    const {subscription, onClick, etcFlag} = props;

    return (
        <>
            <Squircle text={subscription.product.name()} onClick={() => onClick && onClick(subscription)}>
                <ProductAvatarImg product={subscription.product} className="w-8 h-8" />
                {etcFlag && (
                    <div className="absolute left-0 right-0 bottom-0 py-0.5 text-white bg-scordi leading-none text-center text-10 font-medium rounded-b-box">
                        <span className="">+ {etcFlag}</span>
                    </div>
                )}
            </Squircle>
        </>
    );
});
SubscriptionSquircle.displayName = 'SubscriptionSquircle';
