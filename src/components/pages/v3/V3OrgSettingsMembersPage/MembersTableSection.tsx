import {memo, useEffect} from 'react';
import {debounce} from 'lodash';
import {TablePaginator} from '^v3/share/table/TablePaginator';
import {TableSearchControl} from '^v3/share/table/TableSearchControl';
import {MembershipTable} from '^v3/V3OrgSettingsMembersPage/MembershipTable';
import {useTeamMembers} from '^models/TeamMember/hook';

export const MembersTableSection = memo(() => {
    const {result, search, query} = useTeamMembers();

    const teamMembers = result.items;
    const pagination = result.pagination;

    useEffect(() => {
        // first loaded.
        search({order: {id: 'DESC'}, itemsPerPage: 10, relations: ['membership.user']});
    }, []);

    const movePage = (page: number) => search({...query, page});

    const onSearch = debounce(() => {
        if (!query) return;

        search({...query, page: 1});
    }, 500);

    return (
        <div className="flex flex-col gap-4">
            <TableSearchControl totalItemCount={teamMembers.length} onSearch={onSearch} />

            <MembershipTable />

            <div className="flex justify-center">
                <TablePaginator pagination={pagination} onPrev={movePage} onNext={movePage} />
            </div>
        </div>
    );
});
