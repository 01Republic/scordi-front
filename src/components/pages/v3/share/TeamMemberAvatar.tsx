import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {Avatar} from '^components/Avatar';
import {getColor} from '^components/util/palette';

interface TeamMemberAvatarProps {
    teamMember: TeamMemberDto;
    className?: string;
}

export const TeamMemberAvatar = memo((props: TeamMemberAvatarProps) => {
    const {teamMember, className = 'w-10 h-10'} = props;

    const {profileImgUrl, name, email} = teamMember.makeTeamMemberProfile();
    const avatarColor = getColor(email.length + teamMember.id);

    return (
        <Avatar src={profileImgUrl} className={`${className} ${profileImgUrl ? '' : avatarColor}`}>
            <div title={name || email} className="w-full h-full flex items-center justify-center text-white">
                {`${name || email}`.toUpperCase()[0]}
            </div>
        </Avatar>
    );
});
TeamMemberAvatar.displayName = 'TeamMemberAvatar';
