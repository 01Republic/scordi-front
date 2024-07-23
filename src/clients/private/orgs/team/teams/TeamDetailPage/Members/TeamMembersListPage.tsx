import {TeamDetailLayout} from '^clients/private/orgs/team/teams/TeamDetailPage/TeamDetailLayout';
import React, {memo, useEffect} from 'react';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {TeamMemberTableHeader} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/TeamMemberTableHeader';
import {TeamMemberTableRow} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/TeamMemberTableRow';
import {ListTable} from '^clients/private/_components/table/ListTable';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {useRecoilValue} from 'recoil';
import {teamIdParamState} from '^atoms/common';
import {TeamMembersTableRow} from '^clients/private/orgs/team/teams/TeamDetailPage/Members/TeamMembersTableRow';
import {TeamMembersTableHeader} from '^clients/private/orgs/team/teams/TeamDetailPage/Members/TeamMembersTableHeader';
import {useTeamMembershipListInTeamDetail} from '^models/TeamMembership/hook';
import {useTeamCreditCardListInTeamDetail} from '^models/TeamCreditCard/hook';

export const TeamMembersListPage = memo(function TeamMembersListPage() {
    const teamId = useRecoilValue(teamIdParamState);
    const {search, result, isLoading, query, searchAndUpdateCounter, movePage, changePageSize, reload, orderBy} =
        useTeamMembershipListInTeamDetail();

    useEffect(() => {
        // searchAndUpdateCounter({getId: teamId}, false);
        reload();
    }, [teamId]);

    const onSearch = (keyword?: string) => {
        // searchAndUpdateCounter({teamId: teamId, keyword: keyword});
    };

    return (
        <TeamDetailLayout>
            <div className={'flex items-center justify-between pb-4'}>
                <div>전체 {result.pagination.totalItemCount}</div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                    <button className="btn btn-scordi gap-2 mb-1" onClick={() => console.log('click')}>
                        + 멤버 등록
                    </button>
                </div>
            </div>
            {/*<ListTable*/}
            {/*    items={result.items}*/}
            {/*    isLoading={isLoading}*/}
            {/*    Header={() => <TeamMembersTableHeader orderBy={orderBy} />}*/}
            {/*    Row={({item}) => <TeamMembersTableRow teamMember={item} reload={reload} />}*/}
            {/*/>*/}
        </TeamDetailLayout>
    );
});
