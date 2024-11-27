import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {OrgTeamListPageRoute} from '^pages/orgs/[id]/teams';
import {useCurrentTeam} from '^models/Team/hook';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {TeamProfileSection} from './TeamProfileSection';
import {TeamStatCardList} from './TeamStatCardList';
import {OrgTeamDetailPageTabContent, TabName} from './OrgTeamDetailPageTabContent';
import {useUnmount} from '^hooks/useUnmount';

export const OrgTeamDetailPage = memo(function TeamDetailLayout() {
    const orgId = useRecoilValue(orgIdParamState);
    const teamId = useRecoilValue(teamIdParamState);
    const {team, fetchData, clear, reloadWithUpdateCounters} = useCurrentTeam();
    const [tab, setTab] = useState(TabName.members);

    useEffect(() => {
        if (!teamId || isNaN(teamId)) return;
        fetchData();
    }, [teamId]);

    useUnmount(() => clear());

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb
                    paths={[
                        '팀',
                        {text: '팀 목록', active: false, href: OrgTeamListPageRoute.path(orgId)},
                        {text: team?.name || '', active: true},
                    ]}
                />
                <div className={'grid grid-cols-4 gap-4 mt-4'}>
                    <div className={'col-span-1'}>
                        <TeamProfileSection />

                        <TeamStatCardList changeCurrentTab={(tabName) => setTab(tabName)} />
                    </div>

                    <div className={'col-span-3'}>
                        <div className={'flex items-center mb-8'}>
                            <TeamNavItem
                                text={'멤버'}
                                onClick={() => setTab(TabName.members)}
                                isActive={tab === TabName.members}
                            />
                            <TeamNavItem
                                text={'구독'}
                                onClick={() => setTab(TabName.subscriptions)}
                                isActive={tab === TabName.subscriptions}
                            />
                            <TeamNavItem
                                text={'결제수단'}
                                onClick={() => setTab(TabName.payments)}
                                isActive={tab === TabName.payments}
                            />
                            <TeamNavItem
                                text={'청구서'}
                                onClick={() => setTab(TabName.invoices)}
                                isActive={tab === TabName.invoices}
                            />
                        </div>
                        <OrgTeamDetailPageTabContent
                            tab={tab}
                            reload={() => {
                                reloadWithUpdateCounters();
                            }}
                        />
                    </div>
                </div>
            </MainContainer>
        </MainLayout>
    );
});

interface TeamNavItemProps {
    text: string;
    onClick?: () => any;
    isActive?: boolean;
}

const TeamNavItem = memo((props: TeamNavItemProps) => {
    return (
        <div className={`relative pb-2 px-2`}>
            <button onClick={props.onClick} className={`font-medium text-15 text-gray-800 hover:text-scordi-500`}>
                {props.text}
            </button>
            <span
                className={`absolute top-full left-0 right-0 ${
                    props.isActive ? 'h-[2px]' : 'h-0'
                } bg-scordi-500 transition`}
            />
        </div>
    );
});
