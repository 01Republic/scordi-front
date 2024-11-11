import React, {memo} from 'react';
import {getColor} from '^components/util/palette';
import {Avatar} from '^components/Avatar';

interface UserAvatarProps {
    src?: string;
    alt: string;
    fallbackLetter?: string;
    className?: string;
}

export const UserAvatar = memo((props: UserAvatarProps) => {
    const {src = '', alt, fallbackLetter, className = 'w-10 h-10'} = props;

    // const {profileImgUrl, name, email} = teamMember.makeTeamMemberProfile();
    const avatarColor = getColor(alt.length * src.length);

    return (
        <Avatar src={src} className={`${className} ${src ? '' : avatarColor}`}>
            <div title={alt} className="w-full h-full flex items-center justify-center text-white">
                {fallbackLetter || alt[0]}
            </div>
        </Avatar>
    );
});
UserAvatar.displayName = 'UserAvatar';
