import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {useToast} from '^hooks/useToast';
import {FaRegEnvelope} from 'react-icons/fa';

interface InviteButtonProps {
    teamMember: TeamMemberDto;
}

export const InviteButton = memo((props: InviteButtonProps) => {
    const {toast} = useToast();
    const {teamMember} = props;

    return (
        <button onClick={() => toast.info('준비중입니다.')} className="btn btn-sm normal-case gap-2 items-center">
            <FaRegEnvelope /> Invite
        </button>
    );
});
InviteButton.displayName = 'InviteButton';
