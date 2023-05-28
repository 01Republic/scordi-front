import {memo} from 'react';
import {UserDto} from '^types/user.type';

interface UserAvatarProps {
    user: UserDto;
    size?: string;
    textClass?: string;
    roundClass?:
        | 'rounded-none'
        | 'rounded'
        | 'rounded-lg'
        | 'rounded-xl'
        | 'rounded-2xl'
        | 'rounded-3xl'
        | 'rounded-full';
}

export const UserAvatar = memo((props: UserAvatarProps) => {
    const {user, size = 'w-8', roundClass = 'rounded-full', textClass = ''} = props;

    return (
        <div className="avatar placeholder">
            <div className={`bg-neutral-focus text-neutral-content ${roundClass} ${size}`}>
                <span className={`text-xs font-bold ${textClass}`}>{user.name[0]}</span>
            </div>
        </div>
    );
});
