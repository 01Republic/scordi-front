import {useRouter} from 'next/router';
import {FaEdit} from 'react-icons/fa';
import {toast} from 'react-hot-toast';
import {orgIdParamState, teamIdParamState, useRouterIdParamState} from '^atoms/common';
import {teamApi} from '^models/Team/api';
import {useTeamDetail} from '^models/Team/hook';
import React, {memo, useState} from 'react';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {prompt2} from '^components/util/dialog';
import {TeamAvatar} from './TeamAvatar';
import {OrgTeamListPageRoute} from '^pages/orgs/[id]/teams';
import {TeamInvoicesListPage} from './Invoices/TeamInvoicesListPage';
import {TeamSubscriptionsListPage} from './Subscriptions/TeamSubscriptionsListPage';
import {TeamMembersListPage} from './Members/TeamMembersListPage';
import {TeamPaymentsListPage} from './Payments/TeamPaymentsListPage';
import {TeamStatCardList} from './TeamStatCardList';

export const TeamDetailLayout = memo(function TeamDetailLayout() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const {team} = useCurrentTeam();
    const [tab, setTab] = useState('members');

    const PageShow = () => {
        switch (tab) {
            case 'members':
                return <TeamMembersListPage />;
            case 'subscriptions':
                return <TeamSubscriptionsListPage />;
            case 'payments':
                return <TeamPaymentsListPage />;
            case 'invoices':
                return <TeamInvoicesListPage />;
            default:
                return <TeamMembersListPage />;
        }
    };

    if (!team) return <></>;

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb
                    paths={[
                        '팀',
                        {text: '팀 목록', active: false, href: OrgTeamListPageRoute.path(orgId)},
                        {text: team.name, active: true},
                    ]}
                />
                <div className={'grid grid-cols-4 gap-4 mt-4'}>
                    <div className={'col-span-1'}>

                        <TeamStatCardList changeCurrentTab={(tabName) => setTab(tabName)} />
                    </div>
                    <div className={'col-span-3 card border rounded-lg bg-white p-6'}>
                        <div className={'space-x-4 mb-8'}>
                            <TeamNavItem text={'멤버'} onClick={() => setTab('members')} isActive={tab === 'members'} />
                            <TeamNavItem
                                text={'구독'}
                                onClick={() => setTab('subscriptions')}
                                isActive={tab === 'subscriptions'}
                            />
                            <TeamNavItem
                                text={'결제수단'}
                                onClick={() => setTab('payments')}
                                isActive={tab === 'payments'}
                            />
                            <TeamNavItem
                                text={'청구서'}
                                onClick={() => setTab('invoices')}
                                isActive={tab === 'invoices'}
                            />
                        </div>
                        <PageShow />
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
        <div className={`${props.isActive && 'border-b-4 border-scordi-500'} pb-2 inline`}>
            <button
                onClick={props.onClick}
                className={`font-medium text-lg text-gray-800 h-4 hover:text-scordi-500 pb-4`}
            >
                {props.text}
            </button>
        </div>
    );
});
