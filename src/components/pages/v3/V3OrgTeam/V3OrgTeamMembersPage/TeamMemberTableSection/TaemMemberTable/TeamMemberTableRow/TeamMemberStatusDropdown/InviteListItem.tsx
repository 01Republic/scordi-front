import React, {memo} from 'react';
import {FaRegEnvelope} from 'react-icons/fa';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {TeamMemberDto} from '^models/TeamMember';

interface InviteListItemProps {
    teamMember: TeamMemberDto;
    onClick: () => any;
}

export const InviteListItem = memo((props: InviteListItemProps) => {
    const {onClick} = props;

    return (
        <MoreDropdownListItem onClick={onClick}>
            <div className="flex items-center gap-3 w-full py-1">
                <FaRegEnvelope size={12} />
                <p>초대하기</p>
            </div>
        </MoreDropdownListItem>
    );
});
InviteListItem.displayName = 'InviteListItem';
