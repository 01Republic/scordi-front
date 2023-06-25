import {memo, useEffect, useState} from 'react';
import {Paginated} from '^types/utils/paginated.dto';
import {UserDto} from '^types/user.type';
import {userManageApi} from '^api/user-manage.api';
import {UserItem} from './UserItem';
import {AdminListPageLayout} from '^components/pages/admin/layouts/ListPageLayout';

/**
 * TODO: [회원관리목록p] 검색 기능
 * TODO: [회원관리목록p] 페이지네이션 기능
 */
export const AdminUserListPage = memo(() => {
    const [userListPage, setUserListPage] = useState<Paginated<UserDto>>({
        items: [],
        pagination: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 0,
            currentPage: 0,
            itemsPerPage: 0,
        },
    });

    useEffect(() => {
        userManageApi.index({order: {id: 'DESC'}}).then((res) => setUserListPage(res.data));
    }, []);

    return (
        <AdminListPageLayout
            title="회원목록"
            breadcrumbs={[{text: '회원관리'}, {text: '회원목록'}]}
            // createPageRoute={'/admin/users/new'}
        >
            <div className="container pt-10 px-2 sm:px-4">
                <div className="flex items-center justify-between mb-10">
                    <div></div>
                    <div className="min-w-[25vw]">
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {userListPage.items.map((user, i) => (
                        <UserItem key={i} user={user} />
                    ))}
                </div>
            </div>
        </AdminListPageLayout>
    );
});
