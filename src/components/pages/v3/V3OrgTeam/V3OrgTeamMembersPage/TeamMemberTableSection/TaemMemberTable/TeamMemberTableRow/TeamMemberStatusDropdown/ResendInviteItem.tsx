import React, {memo} from 'react';
import {FaRotateRight} from 'react-icons/fa6';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {TeamMemberDto} from '^models/TeamMember';

interface ResendInviteItemProps {
    teamMember: TeamMemberDto;
    onClick: () => any;
}

export const ResendInviteItem = memo((props: ResendInviteItemProps) => {
    const {onClick} = props;

    return (
        <MoreDropdownListItem onClick={onClick}>
            <div className="flex items-center gap-3 w-full py-1">
                <FaRotateRight size={12} />
                <p>다시 보내기</p>
            </div>
        </MoreDropdownListItem>
    );
});
