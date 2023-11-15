import React, {memo} from 'react';
import {UserEditPageRoute} from '^pages/users/edit';
import {useCurrentUser} from '^models/User/hook';

export const ProfileDropDown = memo(() => {
    const {currentUser, logout} = useCurrentUser();

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
                            <a className="justify-between" onClick={() => logout()}>
                                로그아웃
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
});
