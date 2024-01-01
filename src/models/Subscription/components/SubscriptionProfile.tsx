import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {Avatar} from '^components/Avatar';
import {FaQuestion} from 'react-icons/fa6';

interface SubscriptionProfileProps {
    subscription: SubscriptionDto;
}

export const SubscriptionProfile = memo((props: SubscriptionProfileProps) => {
    const {subscription} = props;
    const {product} = subscription;

    return (
        <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6" src={product.image} alt={product.name()} draggable={false} loading="lazy">
                <FaQuestion size={24} className="text-gray-300 h-full w-full p-[6px]" />
            </Avatar>
            <div className="h-full group-hover:text-scordi transition-all">
                <p className="max-w-40 truncate overflow-x-hidden text-sm">
                    {product.name()} {subscription.alias ? `- ${subscription.alias}` : ''}
                </p>
            </div>
        </div>
    );
});
SubscriptionProfile.displayName = 'SubscriptionProfile';
