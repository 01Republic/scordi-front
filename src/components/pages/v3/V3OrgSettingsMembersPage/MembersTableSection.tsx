import {memo, useEffect} from 'react';
import {debounce} from 'lodash';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {useMemberships} from '^hooks/useMemberships';
import {TablePaginator} from '^v3/share/table/TablePaginator';
import {TableSearchControl} from '^v3/share/table/TableSearchControl';
import {MembershipTable} from '^v3/V3OrgSettingsMembersPage/MembershipTable';

export const MembersTableSection = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {query, membershipSearchResult, searchMemberships} = useMemberships();

    useEffect(() => {
        if (!currentOrg) return;

        // first loaded.
        searchMemberships({where: {organizationId: currentOrg.id}, order: {id: 'DESC'}, itemsPerPage: 10});
    }, [currentOrg]);

    const {pagination} = membershipSearchResult;
    const {totalItemCount} = pagination;
    const movePage = (page: number) => searchMemberships({...query, page});
    const onSearch = debounce((keyword: string) => {
        if (query.keyword === keyword) return;
        searchMemberships({...query, keyword, page: 1});
    }, 500);

    return (
        <div className="flex flex-col gap-4">
            <TableSearchControl totalItemCount={totalItemCount} onSearch={onSearch} />

            <MembershipTable />

            <div className="flex justify-center">
                <TablePaginator pagination={pagination} onPrev={movePage} onNext={movePage} />
            </div>
        </div>
    );
});
