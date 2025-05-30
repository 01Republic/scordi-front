import {memo, useEffect} from 'react';
import {debounce} from 'lodash';
import {TablePaginator} from '^v3/share/table/TablePaginator';
import {TableSearchControl} from '^v3/share/table/TableSearchControl';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember/hook';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {TeamMemberTable} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable';

export const TeamMembersTableSection = memo(() => {
    const {result, search: getTeamMembers, movePage, query} = useTeamMembersInTeamMembersTable();
    const orgId = useRecoilValue(orgIdParamState);
    const pagination = result.pagination;

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        getTeamMembers({
            relations: ['membership', 'membership.user', 'organization', 'teams', 'subscriptions'],
            order: {id: 'DESC'},
            itemsPerPage: 10,
        });
    }, [orgId]);

    const onSearch = debounce((keyword?: string) => {
        if (!query) return;

        getTeamMembers({...query, keyword, page: 1});
    }, 500);

    return (
        <div className="flex flex-col gap-4">
            <TableSearchControl
                totalItemCount={pagination.totalItemCount}
                onSearch={onSearch}
                placeholder="멤버 이름을 입력해보세요"
            />

            <TeamMemberTable />

            <div className="flex justify-center">
                <TablePaginator pagination={pagination} movePage={movePage} />
            </div>
        </div>
    );
});
