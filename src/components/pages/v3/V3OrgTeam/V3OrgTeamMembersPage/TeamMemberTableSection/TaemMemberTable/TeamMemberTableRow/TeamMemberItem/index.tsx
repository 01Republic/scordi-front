import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember/type';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';

interface TeamMemberItemProps {
    item: TeamMemberDto;
}

export const TeamMemberItem = memo((props: TeamMemberItemProps) => {
    const {item: teamMember} = props;
    if (!teamMember) return <></>;

    return (
        <div className={`flex items-center gap-4 px-3 -mx-3 text-gray-700 group-hover:text-scordi`}>
            <TeamMemberAvatar teamMember={teamMember} className="w-10 h-10" />

            <div>
                <p className={`font-bold flex gap-2 items-center`}>
                    <span>{teamMember.name}</span>
                </p>
                <p className="block text-sm font-normal text-gray-400 group-hover:text-scordi-300">
                    {teamMember.email}
                </p>
            </div>
        </div>
    );
});
