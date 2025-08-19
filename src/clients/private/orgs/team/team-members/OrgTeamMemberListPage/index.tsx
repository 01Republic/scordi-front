import React, {memo} from 'react';
import {debounce} from 'lodash';
import {useTeamMembers2, useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {StepbyTutorialButton, StepByTutorialTeamMember} from '^components/ExternalCDNScripts/step-by';
import {AddTeamMemberDropdown} from './AddTeamMemberDropdown';
import {AddTeamMemberModal} from './AddTeamMemberModal';
import {InviteStatusScopeHandler} from './InviteStatusScopeHandler';
import {TeamMemberTableHeader} from './TeamMemberTableHeader';
import {TeamMemberTableRow} from './TeamMemberTableRow';
import {useOrgIdParam} from '^atoms/common';

export const OrgTeamMemberListPage = memo(function OrgTeamMemberListPage() {
    const orgId = useOrgIdParam();
    const {
        search,
        result,
        isLoading,
        isEmptyResult,
        query,
        movePage,
        changePageSize,
        reload,
        sortVal,
        newOrderBy,
        isFetched,
    } = useTeamMembers2(orgId, {
        relations: ['teams'],
        order: {id: 'DESC'},
        updateCounterCacheColumn: 'subscriptionCount',
    });

    const onSearch = (keyword?: string) => {
        search({
            ...query,
            keyword: keyword || undefined,
            page: 1,
            itemsPerPage: 30,
        });
    };

    const refresh = () => {
        search({...query, keyword: undefined, page: 1, itemsPerPage: 30});
    };

    return (
        <ListPage
            breadcrumb={['팀', {text: '구성원', active: true}]}
            titleText="구성원"
            Buttons={() => (
                <>
                    <StepbyTutorialButton onClick={StepByTutorialTeamMember} />
                    <AddTeamMemberDropdown reload={refresh} />
                </>
            )}
            ScopeHandler={<InviteStatusScopeHandler search={search} />}
            searchInputPlaceholder="이름, 팀, 연락처 검색"
            onSearch={onSearch}
        >
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="명"
                isNotLoaded={!isFetched}
                isLoading={isLoading}
                isEmptyResult={isEmptyResult}
                emptyMessage="조회된 구성원이 없어요."
                emptyButtonText="구성원 등록"
                EmptyButtons={() => <AddTeamMemberModal reload={refresh} />}
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <TeamMemberTableHeader sortVal={sortVal} orderBy={newOrderBy} />}
                    Row={({item}) => <TeamMemberTableRow teamMember={item} reload={reload} />}
                />
            </ListTableContainer>
        </ListPage>
    );
});
