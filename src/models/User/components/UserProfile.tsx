import {memo} from 'react';
import {UserAvatar} from './UserAvatar';
import {UserDto} from '^models/User/types';
import {WithChildren} from '^types/global.type';

interface UserProfileProps extends WithChildren {
    user: UserDto;
    Avatar?: () => JSX.Element;
    className?: string;
}

export const UserProfile = memo((props: UserProfileProps) => {
    const {user, Avatar, className = ''} = props;

    const UserProfileImage = () => {
        return Avatar ? <Avatar /> : <UserAvatar src={user.profileImgUrl} alt={user.name} className="w-8 h-8" />;
    };

    return (
        <div className={`flex gap-2 ${className}`}>
            <UserProfileImage />
            <div>
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-12 text-gray-400">{user.email}</p>
            </div>
        </div>
    );
});
UserProfile.displayName = 'UserProfile';
