import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {Avatar} from '^components/Avatar';
import {FaQuestion} from 'react-icons/fa6';
import {WithChildren} from '^types/global.type';

interface SubscriptionProfileProps extends WithChildren {
    subscription: SubscriptionDto;
}

export const SubscriptionProfile = memo((props: SubscriptionProfileProps) => {
    const {subscription, children} = props;
    const {product} = subscription;

    return (
        <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6" src={product.image} alt={product.name()} draggable={false} loading="lazy">
                <FaQuestion size={24} className="text-gray-300 h-full w-full p-[6px]" />
            </Avatar>
            <div className="h-full group-hover:text-scordi transition-all w-full overflow-x-hidden">
                {children ? (
                    children
                ) : (
                    <p className="truncate text-sm">
                        {product.name()} {subscription.alias ? `- ${subscription.alias}` : ''}
                    </p>
                )}
            </div>
        </div>
    );
});
SubscriptionProfile.displayName = 'SubscriptionProfile';
