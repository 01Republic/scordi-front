import React, {memo, useEffect} from 'react';
import {MainLayout, MainContainer} from '^clients/private/_layouts/MainLayout';
import {ListPageHeader} from './ListPageHeader';
import {ListController} from './ListController';
import {TeamMemberListTableContainer} from './TeamMemberListTableContainer';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

export const OrgTeamMemberListPage = memo(function OrgTeamMemberListPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const {searchAndUpdateCounter} = useTeamMembersInTeamMembersTable();

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!router.isReady) return;
        searchAndUpdateCounter({
            relations: ['teams'],
            order: {id: 'DESC'},
            updateCounterCacheColumn: 'subscriptionCount',
        });
    }, [orgId, router.isReady]);

    return (
        <MainLayout>
            <MainContainer>
                <ListPageHeader />

                <ListController />

                <TeamMemberListTableContainer />
            </MainContainer>
        </MainLayout>
    );
});
