import {memo, useEffect, useState} from 'react';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllUserByAdminDto, UserDto} from '^types/user.type';
import {userManageApi} from '^api/user-manage.api';
import {UserItem} from './UserItem';
import {AdminListPageLayout} from '^components/pages/admin/layouts/ListPageLayout';
import {useForm} from 'react-hook-form';
import {Paginator} from '^components/Paginator';

/**
 * TODO: [회원관리목록p] 검색 기능
 * TODO: [회원관리목록p] 페이지네이션 기능
 */
export const AdminUserListPage = memo(() => {
    const form = useForm<FindAllUserByAdminDto>();
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

    const fetchData = (params: FindAllUserByAdminDto) => {
        userManageApi.index(params).then((res) => setUserListPage(res.data));
    };

    useEffect(() => {
        fetchData({order: {id: 'DESC'}});
    }, []);

    const onSearch = (data: FindAllUserByAdminDto) => fetchData({keyword: data.keyword, order: {id: 'DESC'}});

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
                        <form onSubmit={form.handleSubmit(onSearch)}>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                {...form.register('keyword')}
                            />
                        </form>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {userListPage.items.length === 0 ? (
                        <div>검색 결과가 없습니다.</div>
                    ) : (
                        <>
                            {userListPage.items.map((user, i) => (
                                <UserItem key={i} user={user} />
                            ))}

                            <div className="flex justify-center w-full">
                                <Paginator
                                    currentPage={userListPage.pagination.currentPage}
                                    totalPage={userListPage.pagination.totalPage}
                                    onClick={(n) => {
                                        fetchData({keyword: form.getValues('keyword'), order: {id: 'DESC'}, page: n});
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AdminListPageLayout>
    );
});
