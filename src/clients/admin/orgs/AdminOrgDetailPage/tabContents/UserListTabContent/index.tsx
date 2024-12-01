import {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {CardTablePanel} from '^admin/share';
import {useUnmount} from '^hooks/useUnmount';
import {useMembershipListInAdminOrgDetail} from '^models/Membership/hook';
import {MembershipLevel} from '^models/Membership/types';
import {UserItem} from './UserItem';

export const UserListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);
    const {result, search, movePage, changePageSize, reset, reload} = useMembershipListInAdminOrgDetail();

    useEffect(() => {
        org &&
            search({
                relations: ['user'],
                where: {organizationId: org.id, level: {op: 'not', val: MembershipLevel.ADMIN}},
                order: {id: 'DESC'},
            });
    }, [org]);

    useUnmount(() => reset());

    if (!org) return <></>;

    const {items, pagination} = result;

    return (
        <div className="w-full">
            <h2 className="mb-6">
                {pagination.totalItemCount.toLocaleString()}
                <small>명이 소속되어 있습니다.</small>
            </h2>

            <CardTablePanel
                gridClass="grid-cols-6"
                entries={items}
                ths={['멤버십 id', '회원', '권한', '가입 승인상태', '워크스페이스 가입일시', '']}
                entryComponent={(membership, i) => <UserItem key={i} membership={membership} reload={reload} />}
                pagination={pagination}
                pageMove={movePage}
                changePageSize={changePageSize}
            />
        </div>
    );
});
