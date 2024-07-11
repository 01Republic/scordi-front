import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {useTeamsForListPage} from '^models/Team/hook';
import {TeamListSection} from '^clients/private/orgs/team/teams/OrgTeamListPage/TeamListSection';

export const OrgTeamListPage = memo(function OrgTeamListPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {search, result, isLoading, query, movePage, changePageSize} = useTeamsForListPage();

    const onReady = () => {
        search({
            where: {organizationId: orgId},
            relations: ['members', 'subscriptions', 'tags'],
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
            breadcrumb={['팀', {text: '팀 목록', active: true}]}
            titleText="팀 목록"
            Buttons={undefined}
            ScopeHandler={undefined}
            searchInputPlaceholder="검색어를 입력해주세요"
            onSearch={onSearch}
        >
            <TeamListSection result={result} isLoading={isLoading} movePage={movePage} />
        </ListPage>
    );
});
