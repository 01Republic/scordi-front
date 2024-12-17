import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {Avatar} from '^components/Avatar';
import {FaQuestion} from 'react-icons/fa6';
import {WithChildren} from '^types/global.type';

interface SubscriptionProfileProps extends WithChildren {
    subscription: SubscriptionDto;
    className?: string;
}

export const SubscriptionProfile = memo((props: SubscriptionProfileProps) => {
    const {subscription, className = '', children} = props;
    const {product} = subscription;

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Avatar className="w-6 h-6" src={product.image} alt={product.name()} draggable={false} loading="lazy">
                <FaQuestion size={24} className="text-gray-300 h-full w-full p-[6px]" />
            </Avatar>
            <div className="h-full flex items-center group-hover:text-scordi transition-all w-full overflow-x-hidden">
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
