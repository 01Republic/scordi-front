import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgTeamMemberListPageRoute} from '^pages/orgs/[id]/teamMembers';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabGroup} from '^clients/private/_layouts/_shared/MainTabButton';
import {useCurrentTeamMember} from './atom';
import {PageMoreDropdownMenu} from './PageMoreDropdownMenu';
import {TeamMemberProfilePanel} from './TeamMemberProfilePanel';
import {TeamMemberBasicInfo, TeamMemberSubscription} from './tab-panes';

export const OrgTeamMemberShowPage = memo(function OrgTeamMemberShowPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentTeamMember} = useCurrentTeamMember();

    return (
        <ShowPage
            breadcrumb={[
                {text: '구성원', active: false, href: OrgTeamMemberListPageRoute.path(orgId)},
                {text: `${currentTeamMember?.name || '구성원 상세'}`, active: true},
            ]}
        >
            <header className="flex items-center justify-between pt-8 pb-4">
                <div className="flex-auto">
                    <TeamMemberProfilePanel />
                </div>
                <div className="flex items-center gap-4 justify-end">
                    <PageMoreDropdownMenu />
                </div>
            </header>

            <main className="pt-4">
                <MainTabGroup
                    tabs={[
                        '기본 정보',
                        '이용 구독',
                        // '활동 내역',
                    ]}
                    tabPanes={[TeamMemberBasicInfo, TeamMemberSubscription, () => <div>활동 내역</div>]}
                />
            </main>
        </ShowPage>
    );
});
