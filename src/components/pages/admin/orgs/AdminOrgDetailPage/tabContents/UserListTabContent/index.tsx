import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {CardTablePanel} from '^admin/share';
import {UserItem} from './UserItem';
import {UserManager} from '^models/User/manager';

export const UserListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);

    if (!org) return <></>;

    const users = UserManager.init(org.users).exceptAdmin();

    return (
        <div className="w-full">
            <h2 className="mb-6">
                {users.length}
                <small>명이 소속되어 있습니다.</small>
            </h2>

            <CardTablePanel
                gridClass="grid-cols-5"
                entries={users.all()}
                ths={['프로필', '레벨', '가입일시', '수정일시', '']}
                entryComponent={(user, i, arr) => <UserItem key={i} user={user} orgId={org.id} />}
            />
        </div>
    );
});
