import {useRouter} from 'next/router';
import {Icon} from './Icon';
import {FC} from 'react';
import {UserDto} from '^types/user.type';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {removeToken} from '^api/api';
import {UserLoginPageRoute} from '^pages/users/login';
import {UserEditPageRoute} from '^pages/users/edit';

interface AdminHeaderProps {
    title: string;
    back?: boolean;
    inputSpace?: any;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({title, back, inputSpace}) => {
    const router = useRouter();
    return (
        <div className="sticky top-0 flex h-14 flex-shrink-0 items-center justify-between bg-white px-4 shadow">
            <div className="flex items-center space-x-3 text-lg font-semibold">
                {back && <Icon.ArrowLeft className="cursor-pointer" onClick={() => router.back()} />}
                <div>{title}</div>
            </div>
            {inputSpace}
        </div>
    );
};

const AdminTopNav: FC<AdminHeaderProps> = ({title, back, inputSpace}) => {
    const currentUser = useCurrentUser();

    return (
        <div className="sticky top-0 navbar bg-white shadow z-10">
            <div className="flex-1 px-2">
                <a className="text-lg font-bold" href={'/'}>
                    {title}
                </a>
            </div>
            <div className="flex-none gap-2">
                <ProfileDropDown currentUser={currentUser} />
            </div>
        </div>
    );
};

const ProfileDropDown = ({currentUser}: {currentUser: UserDto | null}) => {
    const router = useRouter();

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder inline-flex">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                    <span className="text-xs">{currentUser ? currentUser.name[0] : '?'}</span>
                </div>
            </label>
            <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
                {currentUser && (
                    <>
                        <li>
                            <a className="justify-between" href={UserEditPageRoute.path()}>
                                Profile
                            </a>
                        </li>
                        {/*<li><a className="justify-between" href={``}>Settings</a></li>*/}
                        <li>
                            <a
                                className="justify-between"
                                onClick={() => {
                                    removeToken();
                                    router.push(UserLoginPageRoute.path());
                                }}
                            >
                                Logout
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export {AdminTopNav};
