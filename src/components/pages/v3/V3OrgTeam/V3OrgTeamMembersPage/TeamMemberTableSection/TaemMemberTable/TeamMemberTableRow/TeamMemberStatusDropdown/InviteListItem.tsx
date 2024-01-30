import React, {memo, useState} from 'react';
import {FaRegEnvelope} from 'react-icons/fa';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {TeamMemberDto, useSendInviteEmail} from '^models/TeamMember';
import {plainToast} from '^hooks/useToast';
import {CgSpinner} from 'react-icons/cg';

interface InviteListItemProps {
    teamMember: TeamMemberDto;
    onFinish: () => any;
}

export const InviteListItem = memo((props: InviteListItemProps) => {
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
                {isLoading ? (
                    <CgSpinner size={20} className="animate-spin btn-disabled mx-auto" />
                ) : (
                    <>
                        <FaRegEnvelope size={12} />
                        <p>초대하기</p>
                    </>
                )}
            </div>
        </MoreDropdownListItem>
    );
});
InviteListItem.displayName = 'InviteListItem';
