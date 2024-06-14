import React, {memo} from 'react';
import {MainLayout, MainContainer} from '^clients/private/_layouts/MainLayout';
import {ListPageHeader} from './ListPageHeader';
import {ListController} from './ListController';
import {TeamMemberListTableContainer} from './TeamMemberListTableContainer';

export const OrgTeamMemberListPage = memo(function OrgTeamMemberListPage() {
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
