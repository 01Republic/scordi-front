import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {FaCheck} from 'react-icons/fa6';
import {TeamMemberProfile} from '^models/TeamMember/components/TeamMemberProfile';

interface TeamMemberSelectItemProps {
    teamMember: TeamMemberDto;
    onClick?: (selected: TeamMemberDto) => any;
    isSelected?: boolean;
}

export const TeamMemberSelectItem = memo((props: TeamMemberSelectItemProps) => {
    const {teamMember, onClick, isSelected = false} = props;

    return (
        <div
            onClick={() => onClick && onClick(teamMember)}
            className="flex items-center justify-between px-4 py-3 -mx-4 no-selectable hover:bg-scordi-light-50 rounded-btn cursor-pointer group"
        >
            <TeamMemberProfile item={teamMember} />

            <div className="flex items-center">
                <button className="relative">
                    <FaCheck
                        fontSize={16}
                        strokeWidth={0.3}
                        className={isSelected ? `text-indigo-500` : 'text-transparent group-hover:text-indigo-200'}
                    />
                </button>
            </div>
        </div>
    );
});
TeamMemberSelectItem.displayName = 'TeamMemberSelectItem';
