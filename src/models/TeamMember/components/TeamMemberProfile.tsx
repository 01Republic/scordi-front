import {TeamMemberDto} from '^models/TeamMember';
import React, {memo} from 'react';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {FaQuestion} from 'react-icons/fa6';
import {Avatar} from '^components/Avatar';

interface TeamMemberProfileProps {
    item: TeamMemberDto;
}

export const TeamMemberProfile = memo((props: TeamMemberProfileProps) => {
    const {item: teamMember} = props;
    if (!teamMember) return <></>;

    return (
        <div className={`flex items-center gap-4 px-3 -mx-3 text-gray-700 group-hover:text-scordi max-w-sm`}>
            <TeamMemberAvatar teamMember={teamMember} className="w-10 h-10" />

            <div className="overflow-x-hidden">
                <p className="font-bold truncate">
                    <span>{teamMember.name}</span>
                </p>
                <p className="block text-sm font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.email}
                </p>
            </div>
        </div>
    );
});

interface TeamMemberProfileOptionProps {
    item?: TeamMemberDto;
    placeholder?: string;
}

export const TeamMemberProfileOption = memo((props: TeamMemberProfileOptionProps) => {
    const {item: teamMember, placeholder} = props;

    return (
        <div className={`flex items-center gap-2 px-3 -mx-3 text-gray-700 group-hover:text-scordi w-40`}>
            {teamMember ? (
                <TeamMemberAvatar teamMember={teamMember} className="w-7 h-7" />
            ) : (
                <Avatar className="w-7">
                    <FaQuestion size={24} className="h-full w-full p-[6px]" />
                </Avatar>
            )}

            {teamMember ? (
                <div className="flex flex-col gap-0.5">
                    <p className={`flex gap-2 items-center group-hover:text-scordi leading-none`}>
                        <span>{teamMember.name}</span>
                    </p>
                    <p className="block text-xs font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                        {teamMember.email}
                    </p>
                </div>
            ) : (
                <div className="flex items-center">{placeholder || '선택해주세요'}</div>
            )}
        </div>
    );
});
