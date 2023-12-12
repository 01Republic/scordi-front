import {memo} from 'react';
import {FaTimes} from 'react-icons/fa';
import {TeamMemberDto, useSendInviteEmail} from '^models/TeamMember';
import {UserDto} from '^models/User/types';

interface LeaveButtonProps {
    teamMember: TeamMemberDto;
    user: UserDto;
    tooltipMsg?: string;
}

export const LeaveButton = memo((props: LeaveButtonProps) => {
    const {sendEmail} = useSendInviteEmail();
    const {tooltipMsg, teamMember} = props;

    const onClick = () => {
        if (!teamMember.email) return;

        sendEmail(teamMember.email);
    };

    return (
        <div className={tooltipMsg ? `tooltip tooltip-left` : ''} data-tip={tooltipMsg}>
            <button
                onClick={onClick}
                className="btn-disabled opacity-40 btn btn-sm btn-scordi btn-outline normal-case gap-2 items-center"
            >
                <FaTimes /> Leave
            </button>
        </div>
    );
});
LeaveButton.displayName = 'LeaveButton';
