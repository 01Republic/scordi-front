import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {Avatar} from '^components/Avatar';

interface TeamMemberAvatarProps {
    teamMember: TeamMemberDto;
    className?: string;
}

const avatarColorPalette = [
    'bg-green-400',
    'bg-red-400',
    'bg-orange-400',
    'bg-sky-400',
    'bg-emerald-400',
    'bg-cyan-400',
    'bg-pink-400',
];

export const TeamMemberAvatar = memo((props: TeamMemberAvatarProps) => {
    const {teamMember, className = 'w-10 h-10'} = props;

    const {profileImgUrl, name, email} = teamMember.makeTeamMemberProfile();
    const avatarColor = avatarColorPalette[(email.length + teamMember.id) % avatarColorPalette.length];

    return (
        <Avatar src={profileImgUrl} className={`${className} ${profileImgUrl ? '' : avatarColor}`}>
            <div
                data-modulo={(name || email).length % avatarColorPalette.length}
                title={name || email}
                className="w-full h-full flex items-center justify-center text-white"
            >
                {`${name || email}`.toUpperCase()[0]}
            </div>
        </Avatar>
    );
});
TeamMemberAvatar.displayName = 'TeamMemberAvatar';
