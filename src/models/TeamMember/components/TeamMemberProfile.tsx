import {TeamMemberDto} from '^models/TeamMember';
import React, {memo} from 'react';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {FaQuestion} from 'react-icons/fa6';
import {Avatar} from '^components/Avatar';
import {WithChildren} from '^types/global.type';

interface TeamMemberProfileProps extends WithChildren {
    item: TeamMemberDto;
    className?: string;
    hideEmail?: boolean;
}

export const TeamMemberProfile = memo((props: TeamMemberProfileProps) => {
    const {item: teamMember, className = '', hideEmail = false, children} = props;
    if (!teamMember) return <></>;

    return (
        <div
            className={`flex items-center gap-4 px-3 -mx-3 text-gray-700 group-hover:text-scordi max-w-sm ${className}`}
        >
            <TeamMemberAvatar teamMember={teamMember} className="w-10 h-10" />

            {children || (
                <div className="overflow-x-hidden">
                    <p className="font-bold truncate">
                        <span>{teamMember.name}</span>
                    </p>
                    {!hideEmail && (
                        <p className="block text-sm font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                            {teamMember.email}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
});

export const TeamMemberProfileCompact = memo((props: TeamMemberProfileProps) => {
    const {item: teamMember, className = ''} = props;
    if (!teamMember) return <></>;

    return (
        <div className={`h-[20px] flex items-center max-w-sm ${className}`}>
            <TeamMemberAvatar teamMember={teamMember} className="w-[20px] h-[20px] mr-[6px] text-12" />

            <div className="text-14 whitespace-nowrap overflow-hidden text-ellipsis">{teamMember.name}</div>
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
        <div
            data-component="TeamMemberProfileOption"
            className={`flex items-center gap-2 px-3 -mx-3 text-gray-700 group-hover:text-scordi overflow-x-hidden`}
        >
            {teamMember ? (
                <TeamMemberAvatar teamMember={teamMember} className="w-7 h-7" />
            ) : (
                <Avatar className="w-7">
                    <FaQuestion size={24} className="h-full w-full p-[6px]" />
                </Avatar>
            )}

            {teamMember ? (
                <div className="flex flex-col gap-0.5 w-full overflow-hidden">
                    <p className={`flex gap-2 items-center group-hover:text-scordi leading-none`}>
                        <span className="truncate"> {teamMember.name}</span>
                    </p>
                    <p className="block text-xs font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                        <span className="truncate"> {teamMember.email}</span>
                    </p>
                </div>
            ) : (
                <div className="flex items-center">{placeholder || '선택해주세요'}</div>
            )}
        </div>
    );
});
