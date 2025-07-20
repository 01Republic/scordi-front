import React, {memo, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {teamMemberIdParamState, useOrgIdParam} from '^atoms/common';
import {OrgTeamMemberListPageRoute} from '^pages/orgs/[id]/teamMembers';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabGroup} from '^clients/private/_layouts/_shared/MainTabButton';
import {useCurrentTeamMember} from './atom';
import {PageMoreDropdownMenu} from './PageMoreDropdownMenu';
import {TeamMemberProfilePanel} from './TeamMemberProfilePanel';
import {TeamMemberBasicInfo, TeamMemberSubscription} from './tab-panes';
import {useUnmount} from '^hooks/useUnmount';
import {useTranslation} from 'next-i18next';

export const OrgTeamMemberShowPage = memo(function OrgTeamMemberShowPage() {
    const {t} = useTranslation('members');
    const orgId = useOrgIdParam();
    const [teamMemberId, setTeamMemberId] = useRecoilState(teamMemberIdParamState);
    const {currentTeamMember, findTeamMember, clear} = useCurrentTeamMember();

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!teamMemberId || isNaN(teamMemberId)) return;
        findTeamMember(orgId, teamMemberId);
    }, [orgId, teamMemberId]);

    useUnmount(() => {
        clear();
        setTeamMemberId(NaN);
    });

    return (
        <ShowPage
            breadcrumb={[
                {
                    text: t('show.breadcrumb.members') as string,
                    active: false,
                    href: OrgTeamMemberListPageRoute.path(orgId),
                },
                {
                    text: `${currentTeamMember?.name || (t('show.breadcrumb.memberDetail') as string)}`,
                    active: true,
                },
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
                        t('show.tabs.basicInfo') as string,
                        t('show.tabs.subscriptions') as string,
                        // '활동 내역',
                    ]}
                    tabPanes={[
                        TeamMemberBasicInfo,
                        TeamMemberSubscription,
                        () => <div>{t('show.tabs.activity') as string}</div>,
                    ]}
                />
            </main>
        </ShowPage>
    );
});
