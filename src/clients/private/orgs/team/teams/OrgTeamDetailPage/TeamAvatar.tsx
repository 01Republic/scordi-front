import React, {memo} from 'react';
import {getColor} from '^components/util/palette';
import {Avatar} from '^components/Avatar';

interface TeamAvatarProps {
    name: string;
    className?: string;
}

export const TeamAvatar = memo(function TeamAvatar(props: TeamAvatarProps) {
    const {name, className = 'w-10 h-10'} = props;
    const avatarColor = getColor(name.length);

    return (
        <Avatar className={`${className} ${avatarColor}`}>
            <div title={name} className="w-full h-full flex items-center justify-center text-white">
                {`${name}`.toUpperCase()[0]}
            </div>
        </Avatar>
    );
});
