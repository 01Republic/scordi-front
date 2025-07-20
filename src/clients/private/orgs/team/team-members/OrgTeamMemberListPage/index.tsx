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
import {useTranslation} from 'next-i18next';

export const OrgTeamMemberListPage = memo(function OrgTeamMemberListPage() {
    const {t} = useTranslation('members');
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
            breadcrumb={[
                t('list.breadcrumb.team') as string,
                {text: t('list.breadcrumb.members') as string, active: true},
            ]}
            titleText={t('list.title') as string}
            Buttons={() => (
                <>
                    <StepbyTutorialButton onClick={StepByTutorialTeamMember} />
                    <AddTeamMemberDropdown reload={refresh} />
                </>
            )}
            ScopeHandler={<InviteStatusScopeHandler search={search} />}
            searchInputPlaceholder={t('list.searchPlaceholder') as string}
            onSearch={onSearch}
        >
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit={t('list.unit') as string}
                isNotLoaded={!isFetched}
                isLoading={isLoading}
                isEmptyResult={isEmptyResult}
                emptyMessage={t('list.emptyMessage') as string}
                emptyButtonText={t('list.emptyButtonText') as string}
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
