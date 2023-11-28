import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {SubscriptionDto} from 'src/models/Subscription/types';

interface ApplicationLogoProps {
    subscription: SubscriptionDto;
}

export const ApplicationLogo = memo((props: ApplicationLogoProps) => {
    const {subscription} = props;

    const {product: product, workspace} = subscription;
    const {profileImageUrl, displayName} = workspace || {};

    return (
        <div className="relative">
            {profileImageUrl ? (
                <div className="avatar">
                    <div className="w-16 mask mask-squircle">
                        <img src={profileImageUrl} alt={`${displayName} logo on ${product.nameEn}`} />
                    </div>
                </div>
            ) : (
                <div className="avatar placeholder inline-flex">
                    <div className="bg-neutral-focus text-neutral-content border rounded w-10">
                        <span className="font-bold">{`${displayName}`[0]}</span>
                    </div>
                </div>
            )}
            <div className="absolute w-2/5 right-0 bottom-0">
                <div className="avatar">
                    <div className="w-full mask mask-squircle bg-white">
                        <img src={product.image} alt={`${product.nameEn} logo`} />
                    </div>
                </div>
            </div>
        </div>
    );
});
