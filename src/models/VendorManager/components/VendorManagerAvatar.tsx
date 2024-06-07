import React, {memo} from 'react';
import {VendorManagerDto} from '^models/VendorManager/type';
import {Avatar} from '^components/Avatar';
import {getColor} from '^components/util/palette';

interface VendorManagerAvatarProps {
    vendorManager: VendorManagerDto;
    className?: string;
}

export const VendorManagerAvatar = memo((props: VendorManagerAvatarProps) => {
    const {vendorManager, className = 'w-10 h-10'} = props;

    const profileImgUrl = vendorManager.profileImgUrl || undefined;
    const name = vendorManager.name;
    const email = vendorManager.email || undefined;
    const avatarColor = getColor((email || '').length + vendorManager.id);

    return (
        <Avatar src={profileImgUrl || undefined} className={`${className} ${profileImgUrl ? '' : avatarColor}`}>
            <div title={name || email} className="w-full h-full flex items-center justify-center text-white">
                {`${name || email}`.toUpperCase()[0]}
            </div>
        </Avatar>
    );
});
VendorManagerAvatar.displayName = 'VendorManagerAvatar';
