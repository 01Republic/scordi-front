import {memo} from 'react';
import {FaTimes} from 'react-icons/fa';
import {TeamMemberDto} from '^models/TeamMember';
import {UserDto} from '^models/User/types';

interface LeaveButtonProps {
    teamMember: TeamMemberDto;
    user: UserDto;
    tooltipMsg?: string;
}

export const LeaveButton = memo((props: LeaveButtonProps) => {
    const {tooltipMsg} = props;

    return (
        <div className={tooltipMsg ? `tooltip tooltip-left` : ''} data-tip={tooltipMsg}>
            <button className="btn btn-sm btn-scordi btn-outline normal-case gap-2 items-center btn-disabled opacity-40">
                <FaTimes /> Leave
            </button>
        </div>
    );
});
LeaveButton.displayName = 'LeaveButton';
