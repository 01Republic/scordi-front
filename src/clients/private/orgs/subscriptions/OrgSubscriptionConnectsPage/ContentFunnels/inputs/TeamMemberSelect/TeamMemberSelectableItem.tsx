import {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberProfile} from '^models/TeamMember/components/TeamMemberProfile';

interface TeamMemberSelectableItemProps {
    teamMember: TeamMemberDto;
    selected?: boolean;
    onClick: () => any;
}

export const TeamMemberSelectableItem = memo((props: TeamMemberSelectableItemProps) => {
    const {teamMember, selected = false, onClick} = props;

    return (
        <div
            className={`py-3 px-4 rounded-btn transition-all cursor-pointer no-selectable border ${
                selected ? 'border-scordi-300 bg-scordi-50' : 'border-gray-50 bg-gray-50 hover:bg-gray-100'
            } hover:shadow`}
            onClick={onClick}
        >
            <TeamMemberProfile item={teamMember} />
        </div>
    );
});
TeamMemberSelectableItem.displayName = 'TeamMemberSelectableItem';
