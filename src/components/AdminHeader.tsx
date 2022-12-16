import {useRouter} from 'next/router';
import {Icon} from './Icon';
import React, {FC, useEffect} from 'react';
import {UserDto} from '^types/user.type';
import {removeToken} from '^api/api';
import {UserLoginPageRoute} from '^pages/users/login';
import {UserEditPageRoute} from '^pages/users/edit';
import {SidebarOrgHeader} from '^layouts/org/mainLayout';
import {PreLoader} from '^components/PreLoader';
import {useRecoilState} from 'recoil';
import {currentUserAtom} from '^atoms/currentUser.atom';

interface AdminHeaderProps {
    title?: string;
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
    const [currentUser] = useRecoilState(currentUserAtom);
    const [orgName, setOrgName] = React.useState<string>('');

    useEffect(() => {
        !!currentUser && setOrgName(currentUser.orgName);
    }, [currentUser]);

    if (!orgName) return <PreLoader />;
    return (
        <div className="sticky top-0 navbar bg-white shadow z-10 flex justify-between">
            <SidebarOrgHeader orgName={orgName} />
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
                                내 정보 수정
                            </a>
                        </li>
                        <li>
                            <a href="https://api.payplo.me:8080/terms/serviceUsageTerm-v20221101-1.txt" target="_blank">
                                이용약관
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://api.payplo.me:8080/terms/%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EB%B0%A9%EC%B9%A8-v20221101-1.html"
                                target="_blank"
                            >
                                개인정보처리방침
                            </a>
                        </li>
                        <li></li>
                        <li>
                            <a
                                className="justify-between"
                                onClick={() => {
                                    removeToken();
                                    router.push(UserLoginPageRoute.path());
                                }}
                            >
                                로그아웃
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export {AdminTopNav};
