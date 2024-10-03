import React, {memo} from 'react';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {WithChildren} from '^types/global.type';
import {TeamAvatar} from '^clients/private/orgs/team/teams/TeamDetailPage/TeamAvatar';
import {useRouter} from 'next/router';
import {FaEdit} from 'react-icons/fa';
import {orgIdParamState, teamIdParamState, useRouterIdParamState} from '^atoms/common';
import {teamApi} from '^models/Team/api';
import {useTeamDetail} from '^models/Team/hook';
import {prompt2} from '^components/util/dialog';

import {TeamInvoicesListPage} from '^clients/private/orgs/team/teams/TeamDetailPage/Invoices/TeamInvoicesListPage';
import {TeamSubscriptionsListPage} from '^clients/private/orgs/team/teams/TeamDetailPage/Subscriptions/TeamSubscriptionsListPage';
import {TeamMembersListPage} from '^clients/private/orgs/team/teams/TeamDetailPage/Members/TeamMembersListPage';
import {TeamPaymentsListPage} from '^clients/private/orgs/team/teams/TeamDetailPage/Payments/TeamPaymentsListPage';
import {toast} from 'react-hot-toast';

type TeamDetailLayoutProps = WithChildren;

export const TeamDetailLayout = memo(function TeamDetailLayout(props: TeamDetailLayoutProps) {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const teamId = useRouterIdParamState('teamId', teamIdParamState);
    const {team, reload} = useTeamDetail();
    const router = useRouter();
    const [tab, setTab] = React.useState('members');

    const editTeamName = async () => {
        const result = await prompt2(`변경할 팀 이름을 입력해주세요`, () => null, {
            inputValue: team?.name,
        });
        if (result.isConfirmed && result.value) {
            const req = teamApi.update(orgId, teamId, {name: result.value});
            req.then(() => {
                toast.success('변경사항이 저장되었습니다.');
                reload();
            });
        }
    };

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
                        {text: '팀 목록', active: false, href: `/orgs/${orgId}/teams`},
                        {text: team.name, active: true, href: router.asPath},
                    ]}
                />
                <div className={'grid grid-cols-4 gap-4 mt-4'}>
                    <div className={'col-span-1'}>
                        <div className={'card border rounded-lg bg-white p-6'}>
                            <TeamAvatar name={team.name} />
                            <div className={'text-xs mt-4'}>팀 이름</div>
                            <label className="block relative mb-4">
                                <input
                                    type="text"
                                    className="input input-bordered w-full pr-[40px] bg-white disabled:bg-white"
                                    value={team.name}
                                    disabled={true}
                                />
                                <button onClick={editTeamName}>
                                    <FaEdit className="absolute my-auto top-0 bottom-0 right-3" />
                                </button>
                            </label>
                            <div className={'text-sm'}>
                                {team.teamMemberCount.toLocaleString()}명의 멤버 <br />
                                {team.subscriptionCount.toLocaleString()}개의 서비스 구독중 <br />
                                {team.creditCardCount.toLocaleString()}개의 결제수단 <br />
                                {team.invoiceAccountCount.toLocaleString()}개의 청구서
                            </div>
                        </div>
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

const TeamNavItem = (props: TeamNavItemProps) => {
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
};
