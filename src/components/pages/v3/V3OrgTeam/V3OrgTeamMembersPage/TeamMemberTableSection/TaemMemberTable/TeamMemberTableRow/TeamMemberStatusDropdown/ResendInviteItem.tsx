import {TeamMemberDto, useSendInviteEmail} from '^models/TeamMember';
import React, {memo, useState} from 'react';
import {plainToast} from '^hooks/useToast';
import {FaRotateRight} from 'react-icons/fa6';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';

interface ResendInviteItemProps {
    teamMember: TeamMemberDto;
    onFinish: () => any;
}

export const ResendInviteItem = memo((props: ResendInviteItemProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {sendEmail} = useSendInviteEmail();
    const {teamMember, onFinish} = props;

    const onClick = async () => {
        if (!teamMember.email || isLoading) return;

        setIsLoading(true);
        sendEmail(teamMember.email, teamMember.id)
            .then(() => onFinish())
            .catch((err) => plainToast.error(err.response.data.message))
            .finally(() => setIsLoading(false));
    };

    return (
        <MoreDropdownListItem onClick={onClick}>
            <div className="flex items-center gap-3 w-full py-1">
                <FaRotateRight size={12} />
                <p>다시 보내기</p>
            </div>
        </MoreDropdownListItem>
    );
});
