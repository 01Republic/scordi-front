import {memo, useEffect} from 'react';
import {debounce} from 'lodash';
import {TablePaginator} from '^v3/share/table/TablePaginator';
import {TableSearchControl} from '^v3/share/table/TableSearchControl';
import {MembershipTable} from '^v3/V3OrgSettingsMembersPage/MembershipTable';
import {useTeamMembers} from '^models/TeamMember/hook';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

export const MembersTableSection = memo(() => {
    const {result, search: getTeamMembers, query} = useTeamMembers();
    const orgId = useRecoilValue(orgIdParamState);
    const pagination = result.pagination;

    useEffect(() => {
        // first loaded.
        getTeamMembers({
            relations: ['membership', 'membership.user', 'organization', 'teams', 'subscriptions'],
            order: {id: 'DESC'},
            itemsPerPage: 10,
        });
    }, [orgId]);

    const movePage = (page: number) => getTeamMembers({...query, page});

    const onSearch = debounce((data) => {
        if (!query) return;

        const searchQuery = {
            ...(data.length > 0 ? {where: {name: data}} : null),
            page: 1,
        };

        getTeamMembers(searchQuery);
    }, 500);

    return (
        <div className="flex flex-col gap-4">
            <TableSearchControl totalItemCount={pagination.totalItemCount} onSearch={onSearch} />

            <MembershipTable />

            <div className="flex justify-center">
                <TablePaginator pagination={pagination} onPrev={movePage} onNext={movePage} movePage={movePage} />
            </div>
        </div>
    );
});
