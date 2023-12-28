import {memo, useEffect} from 'react';
import {debounce} from 'lodash';
import {TablePaginator} from '^v3/share/table/TablePaginator';
import {TableSearchControl} from '^v3/share/table/TableSearchControl';
import {MembershipTable} from '^v3/V3OrgSettingsMembersPage/MembershipTable';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useMemberships} from '^models/Membership/hook';

export const MembersTableSection = memo(() => {
    const {searchMemberships, membershipSearchResult, query} = useMemberships();
    const orgId = useRecoilValue(orgIdParamState);
    const pagination = membershipSearchResult.pagination;

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        searchMemberships({
            itemsPerPage: 10,
            where: {organizationId: orgId},
        });
    }, [orgId]);

    const movePage = (page: number) => searchMemberships({...query, page});

    const onSearch = debounce((keyword: string) => {
        if (query.keyword === keyword) return;
        searchMemberships({...query, keyword, page: 1});
    });

    return (
        <div className="flex flex-col gap-4">
            <TableSearchControl totalItemCount={pagination.totalItemCount} onSearch={onSearch} />

            <MembershipTable />

            <div className="flex justify-center">
                <TablePaginator pagination={pagination} movePage={movePage} />
            </div>
        </div>
    );
});
