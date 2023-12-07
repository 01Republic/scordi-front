import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {Avatar} from '^components/Avatar';

interface SubscriptionItemProps {
    subscription: SubscriptionDto;
}

export const SubscriptionItem = memo((props: SubscriptionItemProps) => {
    const {subscription} = props;
    const {product} = subscription;

    return (
        <li>
            <div className="!w-auto gap-4 px-4 py-3 -mx-4 hover:bg-neutral btn-like no-selectable">
                <Avatar
                    src={product.image}
                    className="w-9 h-9 outline outline-offset-1 outline-slate-100 rounded-full"
                />

                <div className="flex-1">
                    <p className="font-semibold text-gray-800">{product.name()}</p>
                </div>
            </div>
        </li>
    );
});
SubscriptionItem.displayName = 'SubscriptionItem';
