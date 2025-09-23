import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState, teamIdParamState, useIdParam, useOrgIdParam} from '^atoms/common';
import {OrgTeamListPageRoute} from '^pages/orgs/[id]/teams';
import {useCurrentTeam, useCurrentTeam2} from '^models/Team/hook';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {TeamProfileSection} from './TeamProfileSection';
import {TeamStatCardList} from './TeamStatCardList';
import {OrgTeamDetailPageTabContent, TabName} from './OrgTeamDetailPageTabContent';
import {useUnmount} from '^hooks/useUnmount';
import {currentTeamAtom} from '^models/Team/atom';
import {TeamSubscriptionPriceSummary} from '^clients/private/orgs/team/teams/OrgTeamDetailPage/TeamSubscriptionPriceSummary';
import {currencyFormat, roundNumber} from '^utils/number';

export const OrgTeamDetailPage = memo(function OrgTeamDetailPage() {
    const orgId = useOrgIdParam();
    const teamId = useIdParam('teamId');
    const {reloadWithUpdateCounters} = useCurrentTeam();
    const [tab, setTab] = useState(TabName.members);

    const {data: currentTeamData} = useCurrentTeam2(orgId, teamId);
    const setTeam = useSetRecoilState(currentTeamAtom);

    useEffect(() => {
        setTeam(currentTeamData);
    }, [orgId, currentTeamData]);

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb
                    paths={[
                        '팀',
                        {text: '팀 목록', active: false, href: OrgTeamListPageRoute.path(orgId)},
                        {text: currentTeamData?.name || '', active: true},
                    ]}
                />
                <div className="flex flex-col lg:grid lg:grid-cols-4 gap-7 lg:gap-4 mt-4">
                    <div className="sm:grid sm:grid-cols-4 md:grid-cols-5 lg:block lg:col-span-1 space-y-2 sm:space-x-2 sm:space-y-0 lg:space-y-2 lg:space-x-0">
                        <div className="h-fit sm:h-full sm:col-span-1 md:col-span-2 lg:h-fit">
                            <TeamProfileSection />
                        </div>
                        <div className="sm:col-span-3 space-y-2">
                            <TeamSubscriptionPriceSummary />
                            <TeamStatCardList changeCurrentTab={(tabName) => setTab(tabName)} />
                        </div>
                    </div>

                    <div className={'col-span-3'}>
                        <div className={'flex items-center mb-8'}>
                            <TeamNavItem
                                text={'구성원'}
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
            <button
                onClick={props.onClick}
                className={`font-medium text-15 text-gray-800 hover:text-scordi-500 ${
                    props.isActive ? 'text-scordi-500' : ''
                }`}
            >
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
