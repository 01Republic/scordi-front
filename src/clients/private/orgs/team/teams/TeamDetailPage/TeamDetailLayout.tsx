import React, {memo, useEffect} from 'react';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {WithChildren} from '^types/global.type';
import {TeamAvatar} from '^clients/private/orgs/team/teams/TeamDetailPage/TeamAvatar';
import {TeamPaymentsPageRoute} from '^pages/orgs/[id]/teams/[teamId]/payments';
import {TeamSubscriptionsPageRoute} from '^pages/orgs/[id]/teams/[teamId]/subscriptions';
import {TeamMembersPageRoute} from '^pages/orgs/[id]/teams/[teamId]/members';
import {useRouter} from 'next/router';
import {FaEdit} from 'react-icons/fa';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, teamIdParamState, useRouterIdParamState} from '^atoms/common';
import Link from 'next/link';
import {teamApi} from '^models/Team/api';
import {TeamDto} from '^models/Team/type';
import {useTeamDetail} from '^models/Team/hook';
import {prompt2} from '^components/util/dialog';
import {reload} from '@firebase/auth';
import {toast} from 'react-toastify';
import {TeamInvoicesListPage} from '^clients/private/orgs/team/teams/TeamDetailPage/Invoices/TeamInvoicesListPage';
import {TeamInvoicesPageRoute} from '^pages/orgs/[id]/teams/[teamId]/invoices';

type TeamDetailLayoutProps = WithChildren;

export const TeamDetailLayout = memo(function TeamDetailLayout(props: TeamDetailLayoutProps) {
    const {children} = props;
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const teamId = useRouterIdParamState('teamId', teamIdParamState);
    const {team, reload} = useTeamDetail();

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

    if (!team) return <></>;

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb paths={['팀', {text: '팀 목록', active: true, href: `/orgs/${orgId}/teams`}]} />
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
                            <TeamNavItem text={'멤버'} link={TeamMembersPageRoute.path(orgId, teamId)} />
                            <TeamNavItem text={'구독'} link={TeamSubscriptionsPageRoute.path(orgId, teamId)} />
                            <TeamNavItem text={'결제수단'} link={TeamPaymentsPageRoute.path(orgId, teamId)} />
                            <TeamNavItem text={'청구서'} link={TeamInvoicesPageRoute.path(orgId, teamId)} />
                        </div>
                        {children}
                    </div>
                </div>
            </MainContainer>
        </MainLayout>
    );
});

interface TeamNavItemProps {
    text: string;
    link: string;
}

const TeamNavItem = (props: TeamNavItemProps) => {
    const router = useRouter();

    const isActive = router.asPath === props.link;

    return (
        <div className={`${isActive && 'border-b-4 border-scordi-500'} pb-2 inline`}>
            <Link href={props.link} className={`font-medium text-lg text-gray-800 h-4 hover:text-scordi-500 pb-4`}>
                {props.text}
            </Link>
        </div>
    );
};
