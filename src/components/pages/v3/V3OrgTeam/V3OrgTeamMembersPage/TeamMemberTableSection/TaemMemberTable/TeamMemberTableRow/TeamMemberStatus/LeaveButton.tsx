import {memo} from 'react';
import {FaSignOutAlt, FaTimes} from 'react-icons/fa';
import {UserDto} from '^models/User/types';

interface LeaveButtonProps {
    user: UserDto;
    tooltipMsg?: string;
    disabled?: boolean;
    text?: string;
}

export const LeaveButton = memo((props: LeaveButtonProps) => {
    const {user, tooltipMsg, disabled = false, text = '조직 나가기'} = props;

    const onClick = () => {
        if (disabled) return;
        console.log('user', user);
    };

    return (
        <div className={tooltipMsg ? `tooltip tooltip-left` : ''} data-tip={tooltipMsg}>
            <button
                onClick={onClick}
                className={`${
                    disabled ? 'btn-disabled opacity-40' : ''
                } btn btn-sm text-xs btn-error btn-outline normal-case gap-2 items-center min-w-[105px] justify-start`}
            >
                <FaSignOutAlt /> {text}
            </button>
        </div>
    );
});
LeaveButton.displayName = 'LeaveButton';
