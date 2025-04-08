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
        <div className="p-4 bg-gray-50 rounded-md flex items-center justify-between">
            <div className="flex-1 min-w-0">
                <TeamMemberProfile item={teamMember} />
            </div>
            <div className="shrink-0 cursor-pointer ml-2 text-28" onClick={() => onRemove(teamMember)}>
                <X />
            </div>
        </div>
    );
};
