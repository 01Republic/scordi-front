import React, {memo} from 'react';
import Image from 'next/image';
import {FaQuestion} from 'react-icons/fa6';
import {SubscriptionDto} from '^models/Subscription/types';

interface SubscriptionProfileProps {
    subscription: SubscriptionDto;
    width?: number;
    height?: number;
    className?: string;
    profileClassName?: string;
    textClassName?: string;
    isAlias?: boolean;
}

export const SubscriptionProfile = memo((props: SubscriptionProfileProps) => {
    const {subscription, width = 24, height = 24, isAlias = true} = props;
    const {className = 'gap-2', profileClassName, textClassName = 'text-sm truncate font-base'} = props;

    const {product} = subscription;
    return (
        <div className={`flex items-center ${className}`}>
            {product.image ? (
                <Image
                    src={product.image}
                    alt={product.name()}
                    width={width}
                    height={height}
                    loading="lazy"
                    draggable={false}
                    className={`rounded-full overflow-hidden ${profileClassName}`}
                />
            ) : (
                <div
                    className={`flex items-center bg-gray-100 rounded-full ${profileClassName}`}
                    style={{width: width, height: height}}
                >
                    <FaQuestion className="text-neutral-900 h-full w-full p-1" />
                </div>
            )}
            <p className={`text-neutral-900 whitespace-nowrap ${textClassName}`}>
                {product.name()} {isAlias && subscription.alias && `- ${subscription.alias}`}
            </p>
        </div>
    );
});

SubscriptionProfile.displayName = 'SubscriptionProfile';
