import React, {memo} from 'react';
import {debounce} from 'lodash';
import {useOrgIdParam} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {useTeamsForListPage} from '^models/Team/hook';
import {TeamListSection} from './TeamListSection';

export const OrgTeamListPage = memo(function OrgTeamListPage() {
    const organizationId = useOrgIdParam();
    const {search, query, clearCache} = useTeamsForListPage();

    const onReady = () => {
        search({
            where: {organizationId},
            relations: ['members'],
            order: {id: 'DESC'},
        });
    };

    const onSearch = debounce((keyword?: string) => {
        return search({
            ...query,
            keyword: keyword || undefined,
            page: 1,
            itemsPerPage: 30,
        });
    }, 500);

    return (
        <ListPage
            onReady={onReady}
            onUnmount={() => clearCache()}
            breadcrumb={['팀', {text: '팀 목록', active: true}]}
            titleText="팀 목록"
            Buttons={undefined}
            ScopeHandler={undefined}
            onSearch={onSearch}
            searchInputPlaceholder="검색어를 입력해주세요"
            searchInputPosition="end-of-buttons"
        >
            <TeamListSection />
        </ListPage>
    );
});
