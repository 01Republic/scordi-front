import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {FaQuestion} from 'react-icons/fa6';
import {SubscriptionDto} from '^models/Subscription/types';

interface ProductProfileProps {
    subscription: SubscriptionDto;
}

export const ProductProfile = memo((props: ProductProfileProps) => {
    const {subscription} = props;
    const {product} = subscription;

    return (
        <div className="">
            <div className="flex items-center gap-2">
                <Avatar className="w-8" src={product.image} alt={product.name()} draggable={false} loading="lazy">
                    <FaQuestion size={24} className="text-gray-300 h-full w-full p-[6px]" />
                </Avatar>
                <div className="flex-1 h-full group-hover:text-scordi transition-all">
                    <p className="">{product.name()}</p>
                </div>
            </div>
        </div>
    );
});
ProductProfile.displayName = 'ProductProfile';
