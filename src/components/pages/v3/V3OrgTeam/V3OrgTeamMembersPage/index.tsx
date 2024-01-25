import React, {memo} from 'react';
import {V3MainLayout, V3MainLayoutContainer} from '^v3/layouts/V3MainLayout';
import {useTranslation} from 'next-i18next';
import {useOnResize2} from '^components/util/onResize2';
import {V3MainLayoutMobile} from '^v3/layouts/V3MainLayout.mobile';
import {BottomTabIndex} from '^v3/share/BottomNavMobile';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {TeamMembersPanel} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/mobile/TeamMembersPanel';
import {TeamMembersTableSection} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection';
import {TeamMemberDetailModal} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/_localModals/TeamMemberDetailModal';
import {NewTeamMemberModalInTeamMember} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/_localModals/NewTeamMemberModal';
import {AddMemberButton2} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/AddMemberButton2';

export const V3OrgTeamMembersPage = memo(() => {
    const {t} = useTranslation('org-home');
    const {isDesktop} = useOnResize2();

    if (isDesktop) {
        return (
            <V3MainLayout
                activeTabIndex={LNBIndex.Members}
                modals={[
                    TeamMemberDetailModal, // 멤버 상세 모달
                    NewTeamMemberModalInTeamMember, // 멤버 추가 모달
                ]}
            >
                <V3MainLayoutContainer>
                    <section className="mb-6">
                        <div className="flex justify-between mb-5">
                            <h1>멤버 관리</h1>
                            <AddMemberButton2 />
                        </div>
                        <TeamMembersTableSection />
                    </section>
                </V3MainLayoutContainer>
            </V3MainLayout>
        );
    } else {
        return (
            <V3MainLayoutMobile
                title="멤버 목록"
                activeTabIndex={BottomTabIndex.MEMBERS}
                modals={[NewTeamMemberModalInTeamMember]}
            >
                <TeamMembersPanel />
            </V3MainLayoutMobile>
        );
    }
});
