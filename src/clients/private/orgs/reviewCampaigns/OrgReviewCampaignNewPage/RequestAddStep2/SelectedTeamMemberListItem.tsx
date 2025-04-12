import {TeamMemberProfile} from '^models/TeamMember/components/TeamMemberProfile';
import {X} from 'lucide-react';
import React from 'react';
import {TeamMemberDto} from '^models/TeamMember';

interface SelectedTeamMemberListItemProps {
    teamMember: TeamMemberDto;
    onRemove: (member: TeamMemberDto) => void;
}

export const SelectedTeamMemberListItem = (props: SelectedTeamMemberListItemProps) => {
    const {teamMember, onRemove} = props;

    return (
        <div
            className="px-4 py-3 bg-gray-50 rounded-md group flex items-center justify-between cursor-pointer hover:shadow-lg transition-all"
            onClick={() => onRemove(teamMember)}
        >
            <div className="">
                <TeamMemberProfile item={teamMember} />
            </div>
            <div className="text-gray-400 group-hover:text-gray-700 transition-all">
                <X fontSize={16} />
            </div>
        </div>
    );
};
