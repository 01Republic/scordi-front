import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgTeamMemberListPageRoute} from '^pages/orgs/[id]/teamMembers';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {useCurrentTeamMember} from './atom';
import {PageMoreDropdownMenu} from './PageMoreDropdownMenu';
import {TeamMemberProfilePanel} from './TeamMemberProfilePanel';
import {MainTabButton} from './MainTabButton';
import {TeamMemberBasicInfo, TeamMemberSubscription} from './tab-panes';

export const OrgTeamMemberShowPage = memo(function OrgTeamMemberShowPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentTeamMember} = useCurrentTeamMember();
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb
                    paths={[
                        {text: '구성원', active: false, href: OrgTeamMemberListPageRoute.path(orgId)},
                        {text: `${currentTeamMember?.name || '구성원 상세'}`, active: true},
                    ]}
                />

                <header className="flex items-center justify-between pt-8 pb-4">
                    <div className="flex-auto">
                        <TeamMemberProfilePanel />
                    </div>
                    <div className="flex items-center gap-4 justify-end">
                        <PageMoreDropdownMenu />
                    </div>
                </header>

                <main className="pt-4">
                    <div className="flex gap-6 items-center border-b border-gray-300 text-16 font-semibold text-gray-500 transition-all">
                        <MainTabButton active={activeTabIndex == 0} onClick={() => setActiveTabIndex(0)}>
                            기본 정보
                        </MainTabButton>
                        <MainTabButton active={activeTabIndex == 1} onClick={() => setActiveTabIndex(1)}>
                            이용 구독
                        </MainTabButton>
                        {/*<MainTabButton active={activeTabIndex == 2} onClick={() => setActiveTabIndex(2)}>*/}
                        {/*    활동 내역*/}
                        {/*</MainTabButton>*/}
                    </div>

                    <div>
                        {activeTabIndex === 0 && <TeamMemberBasicInfo />}
                        {activeTabIndex === 1 && <TeamMemberSubscription />}
                        {activeTabIndex === 2 && <div>활동 내역</div>}
                    </div>
                </main>
            </MainContainer>
        </MainLayout>
    );
});
