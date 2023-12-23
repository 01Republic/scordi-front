import {memo, useEffect} from 'react';
import {debounce} from 'lodash';
import {TablePaginator} from '^v3/share/table/TablePaginator';
import {TableSearchControl} from '^v3/share/table/TableSearchControl';
import {useTeamMembers} from '^models/TeamMember/hook';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {TeamMemberTable} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable';

export const TeamMembersTableSection = memo(() => {
    const {result, search: getTeamMembers, movePage, query} = useTeamMembers();
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

    // const movePage = (page: number) => getTeamMembers({...query, page});

    const onSearch = debounce((data) => {
        if (!query) return;

        const searchQuery = {
            ...query,
            ...(data.length > 0 ? {where: {name: data}} : null),
            page: 1,
        };

        getTeamMembers(searchQuery);
    }, 500);

    return (
        <div className="flex flex-col gap-4">
            <TableSearchControl totalItemCount={pagination.totalItemCount} onSearch={onSearch} />

            <TeamMemberTable />

            <div className="flex justify-center">
                <TablePaginator pagination={pagination} movePage={movePage} />
            </div>
        </div>
    );
});
