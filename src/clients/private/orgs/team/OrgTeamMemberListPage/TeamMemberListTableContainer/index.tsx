import React, {memo} from 'react';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {TeamMemberTableHeader} from './TeamMemberTableHeader';
import {TeamMemberTableRow} from './TeamMemberTableRow';

interface TeamMemberListTableContainerProps {}

export const TeamMemberListTableContainer = memo((props: TeamMemberListTableContainerProps) => {
    const {result, isLoading, reload, orderBy, movePage, changePageSize} = useTeamMembersInTeamMembersTable();

    return (
        <ListTableContainer
            pagination={result.pagination}
            movePage={movePage}
            changePageSize={changePageSize}
            unit="명"
        >
            <ListTable
                items={result.items}
                isLoading={isLoading}
                Header={() => <TeamMemberTableHeader orderBy={orderBy} />}
                Row={({item}) => <TeamMemberTableRow teamMember={item} reload={reload} />}
            />
        </ListTableContainer>
    );
});
TeamMemberListTableContainer.displayName = 'TeamMemberListTableContainer';
