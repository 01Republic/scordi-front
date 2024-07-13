import {TeamDetailLayout} from '^clients/private/orgs/team/teams/TeamDetailPage/TeamDetailLayout';
import React, {memo} from 'react';
import {ListTable} from '^clients/private/_components/table/ListTable';
import {TeamMemberTableHeader} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/TeamMemberTableHeader';
import {TeamMemberTableRow} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/TeamMemberTableRow';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';

export const TeamMembersListPage = memo(function TeamMembersDetailPage() {
    // TODO: 팀 멤버 리스트만 불러와야 함
    const {search, result, isLoading, query, searchAndUpdateCounter, movePage, changePageSize, reload, orderBy} =
        useTeamMembersInTeamMembersTable();

    const onSearch = () => {
        console.log('search');
    };

    return (
        <TeamDetailLayout>
            <div className={'flex items-center justify-between pb-4'}>
                <div>전체 15</div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                    <button className="btn btn-scordi gap-2 mb-1" onClick={() => console.log('click')}>
                        + 멤버 등록
                    </button>
                </div>
            </div>
            <ListTable
                items={result.items}
                isLoading={isLoading}
                Header={() => <TeamMemberTableHeader orderBy={orderBy} />}
                Row={({item}) => <TeamMemberTableRow teamMember={item} reload={reload} />}
            />
        </TeamDetailLayout>
    );
});
