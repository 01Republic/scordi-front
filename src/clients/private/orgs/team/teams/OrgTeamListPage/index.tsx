import React, {memo} from 'react';
import {debounce} from 'lodash';
import {useTranslation} from 'next-i18next';
import {useOrgIdParam} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {useTeamsForListPage} from '^models/Team/hook';
import {TeamListSection} from './TeamListSection';

export const OrgTeamListPage = memo(function OrgTeamListPage() {
    const {t} = useTranslation('teams');
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
            breadcrumb={[t('common.team') as string, {text: t('list.title') as string, active: true}]}
            titleText={t('list.title') as string}
            Buttons={undefined}
            ScopeHandler={undefined}
            onSearch={onSearch}
            searchInputPlaceholder={t('list.searchPlaceholder') as string}
            searchInputPosition="end-of-buttons"
        >
            <TeamListSection />
        </ListPage>
    );
});
