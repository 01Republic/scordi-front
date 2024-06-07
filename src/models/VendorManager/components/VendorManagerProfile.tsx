import React, {memo} from 'react';
import {VendorManagerDto} from '^models/VendorManager/type';
import {VendorManagerAvatar} from './VendorManagerAvatar';

interface VendorManagerProfileProps {
    item: VendorManagerDto;
    avatarClass?: string;
}

export const VendorManagerProfile = memo((props: VendorManagerProfileProps) => {
    const {item: vendorManager, avatarClass = 'w-10 h-10'} = props;

    return (
        <div className={`flex items-center gap-4 px-3 -mx-3 text-gray-700 group-hover:text-scordi max-w-sm`}>
            <VendorManagerAvatar vendorManager={vendorManager} className={avatarClass} />

            <div className="overflow-x-hidden">
                <p className="font-bold truncate leading-none">
                    <span>{vendorManager.name}</span>
                </p>
                {(vendorManager.email || vendorManager.phone) && (
                    <p className="mt-0.5 block text-12 leading-none font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                        {vendorManager.email}
                        {vendorManager.phone && (
                            <span>
                                <span className="text-11 px-2">/</span>
                                {vendorManager.phone}
                            </span>
                        )}
                    </p>
                )}
            </div>
        </div>
    );
});
VendorManagerProfile.displayName = 'VendorManagerProfile';
