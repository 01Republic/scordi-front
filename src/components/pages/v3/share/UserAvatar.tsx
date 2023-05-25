import {memo} from 'react';
import {UserDto} from '^types/user.type';

interface UserAvatarProps {
    user: UserDto;
    size?: string;
    textClass?: string;
}

export const UserAvatar = memo((props: UserAvatarProps) => {
    const {user, size = 'w-8', textClass = ''} = props;

    return (
        <div className="avatar placeholder">
            <div className={`bg-neutral-focus text-neutral-content rounded-full ${size}`}>
                <span className={`text-xs font-bold ${textClass}`}>{user.name[0]}</span>
            </div>
        </div>
    );
});
