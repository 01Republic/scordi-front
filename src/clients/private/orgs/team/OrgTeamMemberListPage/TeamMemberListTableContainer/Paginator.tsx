import React, {memo} from 'react';
import {ListTablePaginator} from '^clients/private/_layouts/_shared/ListTablePaginator';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember';

export const Paginator = memo(function Paginator() {
    const {result, movePage, changePageSize} = useTeamMembersInTeamMembersTable();
    const {currentPage} = result.pagination;

    return (
        <ListTablePaginator
            pagination={result.pagination}
            prevButtonClick={() => movePage(currentPage - 1)}
            nextButtonClick={() => movePage(currentPage + 1)}
            onChangePerPage={changePageSize}
            unit="명"
        />
    );
});
