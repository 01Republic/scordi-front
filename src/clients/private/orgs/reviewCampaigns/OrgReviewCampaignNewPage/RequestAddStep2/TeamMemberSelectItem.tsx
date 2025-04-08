import React from 'react';
import Image from 'next/image';
import SlackIcon from '^public/logo/icons/ic_slack.png';
import GmailIcon from '^public/logo/icons/ic_gmail.png';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^components/pages/v3/share/TeamMemberAvatar';

interface TeamMemberSelectItemProps {
    teamMember: TeamMemberDto;
    onSelect: (member: TeamMemberDto) => void;
}

export const TeamMemberSelectItem = (props: TeamMemberSelectItemProps) => {
    const {teamMember, onSelect} = props;

    return (
        <div
            key={teamMember.id}
            className={
                'px-5 py-3 rounded-md flex items-center justify-between cursor-pointer hover:bg-scordi-50 bg-gray-50'
            }
            onClick={() => onSelect(teamMember)}
        >
            <div className={`h-[20px] flex items-center space-x-3`}>
                <TeamMemberAvatar teamMember={teamMember} className="w-[20px] h-[20px] mr-[6px] text-12" />
                <div className="text-14 whitespace-nowrap overflow-hidden text-ellipsis font-medium">
                    {teamMember.name}
                </div>
                <div className="text-14 whitespace-nowrap overflow-hidden text-ellipsis text-gray-300">
                    {teamMember.email}
                </div>
            </div>
            <div className={'flex items-center justify-start space-x-3'}>
                <Image src={SlackIcon} alt={'slack'} width={16} />
                <Image src={GmailIcon} alt={'gmail'} width={16} />
            </div>
        </div>
    );
};
