import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {useRouter} from 'next/router';
import {AdminUsersPageRoute} from '^pages/admin/users';
import {AdminPostsPageRoute} from '^pages/admin/posts';

interface AdminSideBarProps extends WithChildren {}

export const AdminSideBar = memo((props: AdminSideBarProps) => {
    const {children} = props;
    const router = useRouter();

    return (
        <div className="w-60 bg-base-100 text-base-content">
            <div className="p-4 bg-scordi text-white font-bold text-2xl text-center">scordi admin</div>
            <ul className="menu p-4">
                {/*Sidebar content here*/}
                <li>
                    <a onClick={() => router.push(AdminUsersPageRoute.path())}>회원관리</a>
                </li>
                <li>
                    <a onClick={() => router.push(AdminPostsPageRoute.path())}>블로그 관리</a>
                </li>
            </ul>
        </div>
    );
});
