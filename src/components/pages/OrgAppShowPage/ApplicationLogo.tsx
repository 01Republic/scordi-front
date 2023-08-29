import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {SubscriptionDto} from '^types/subscription.type';

interface ApplicationLogoProps {
    application: SubscriptionDto;
}

export const ApplicationLogo = memo((props: ApplicationLogoProps) => {
    const {application} = props;

    const {prototype: proto, profileImage, displayName} = application;

    return (
        <div className="relative">
            {profileImage ? (
                <div className="avatar">
                    <div className="w-16 mask mask-squircle">
                        <img src={profileImage} alt={`${displayName} logo on ${proto.name}`} />
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
                        <img src={proto.image} alt={`${proto.name} logo`} />
                    </div>
                </div>
            </div>
        </div>
    );
});
