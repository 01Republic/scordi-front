import {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {CardTablePanel} from '^admin/share';
import {UserItem} from './UserItem';
import {UserManager} from '^models/User/manager';
import {useOrgUsersInAdmin} from '^models/User/hook/admin';

export const UserListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);
    const {result, search, movePage, changePageSize} = useOrgUsersInAdmin();

    useEffect(() => {
        if (!org) return;
        search({orgId: org.id, notAdmin: true});
    }, [org]);

    if (!org) return <></>;

    const {items, pagination} = result;
    const users = UserManager.init(items).exceptAdmin();

    return (
        <div className="w-full">
            <h2 className="mb-6">
                {pagination.totalItemCount.toLocaleString()}
                <small>명이 소속되어 있습니다.</small>
            </h2>

            <CardTablePanel
                gridClass="grid-cols-5"
                entries={users.all()}
                ths={['프로필', '레벨', '가입일시', '수정일시', '']}
                entryComponent={(user, i, arr) => <UserItem key={i} user={user} orgId={org.id} />}
                pagination={pagination}
                pageMove={movePage}
                changePageSize={changePageSize}
            />
        </div>
    );
});
