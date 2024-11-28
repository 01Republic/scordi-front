import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminUserDetail} from '../index';
import {CardTable, CardTablePanel, CardTableTH} from '../../../share/panels/CardTablePanel';
import {MembershipItem} from './MembershipItem';
import {UserIsAdminHandler} from '^admin/users/AdminUserDetailPage/MembershipListTabContent/UserIsAdminHandler';

export const MembershipListTabContent = memo(() => {
    const user = useRecoilValue(adminUserDetail);

    if (!user) return <></>;

    const memberships = user.memberships || [];

    return (
        <div className="w-full">
            <div className="mb-6 flex items-center">
                <h2>
                    {memberships.length}
                    <small>개의 조직에 소속되어 있습니다.</small>
                </h2>

                <div className="ml-auto flex items-center gap-4">
                    <div>
                        <UserIsAdminHandler />
                    </div>
                    <div></div>
                </div>
            </div>

            <CardTablePanel
                gridClass="grid-cols-6"
                entries={memberships}
                ths={['조직', '조직내 권한', '조직 가입 승인상태', '조직 링크', '가입일시']}
                entryComponent={(membership, i, arr) => (
                    <MembershipItem membership={membership} key={i} borderBottom={i + 1 < arr.length} />
                )}
            />
        </div>
    );
});
