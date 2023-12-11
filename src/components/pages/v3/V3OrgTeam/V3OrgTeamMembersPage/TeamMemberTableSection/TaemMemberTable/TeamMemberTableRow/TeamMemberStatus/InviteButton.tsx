import React, {memo} from 'react';
import {TeamMemberDto, useSendInviteEmail} from '^models/TeamMember';
import {FaRegEnvelope} from 'react-icons/fa';

interface InviteButtonProps {
    teamMember: TeamMemberDto;
}

export const InviteButton = memo((props: InviteButtonProps) => {
    const {sendEmail} = useSendInviteEmail();
    const {teamMember} = props;

    const onClick = () => {
        if (!teamMember.email) return;

        sendEmail(teamMember.email);
    };

    return (
        <button onClick={onClick} className="btn btn-sm normal-case gap-2 items-center">
            <FaRegEnvelope /> Invite
        </button>
    );
});
InviteButton.displayName = 'InviteButton';
