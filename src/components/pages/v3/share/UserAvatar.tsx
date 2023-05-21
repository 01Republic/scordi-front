import {memo} from 'react';
import {UserDto} from '^types/user.type';

interface UserAvatarProps {
    user: UserDto;
}

export const UserAvatar = memo((props: UserAvatarProps) => {
    const {user} = props;

    return (
        <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                <span className="text-xs font-bold">{user.name[0]}</span>
            </div>
        </div>
    );
});
