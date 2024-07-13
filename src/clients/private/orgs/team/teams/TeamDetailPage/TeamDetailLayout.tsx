import React from 'react';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {WithChildren} from '^types/global.type';
import {TeamAvatar} from '^clients/private/orgs/team/teams/TeamDetailPage/TeamAvatar';
import {TeamPaymentsPageRoute} from '^pages/orgs/[id]/teams/[teamId]/payments';
import {TeamSubscriptionsPageRoute} from '^pages/orgs/[id]/teams/[teamId]/subscriptions';
import {TeamMembersPageRoute} from '^pages/orgs/[id]/teams/[teamId]/members';
import {useRouter} from 'next/router';
import {FaEdit} from 'react-icons/fa';

export const TeamDetailLayout = ({children}: WithChildren) => {
    const router = useRouter();
    const orgId = Number(router.query.id);
    const teamId = Number(router.query.teamId);

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb paths={['팀', {text: '팀 목록', active: true}]} />
                <div className={'grid grid-cols-4 gap-4 mt-4'}>
                    <div className={'col-span-1'}>
                        <div className={'card border rounded-lg bg-white p-6'}>
                            <TeamAvatar name={'팀명입니다'} />
                            <div className={'text-xs mt-4'}>팀 이름</div>
                            <label className="block relative mb-4">
                                <input
                                    type="text"
                                    className="input input-bordered w-full pr-[40px] bg-white disabled:bg-white"
                                    value={`팀명입니다`}
                                    disabled={true}
                                />
                                <FaEdit className="absolute my-auto top-0 bottom-0 right-3" onClick={() => null} />
                            </label>
                            <div className={'text-sm'}>
                                4명의 멤버 <br />
                                10개의 서비스 구독중 <br />
                                6개의 결제수단
                            </div>
                        </div>
                    </div>
                    <div className={'col-span-3 card border rounded-lg bg-white p-6'}>
                        <div className={'space-x-4 mb-8'}>
                            <TeamNavItem text={'멤버'} link={TeamMembersPageRoute.path(orgId, teamId)} />
                            <TeamNavItem text={'구독'} link={TeamSubscriptionsPageRoute.path(orgId, teamId)} />
                            <TeamNavItem text={'결제수단'} link={TeamPaymentsPageRoute.path(orgId, teamId)} />
                        </div>
                        {children}
                    </div>
                </div>
            </MainContainer>
        </MainLayout>
    );
};

interface TeamNavItemProps {
    text: string;
    link: string;
}

const TeamNavItem = (props: TeamNavItemProps) => {
    const router = useRouter();

    const isActive = router.asPath === props.link;

    return (
        <div className={`${isActive && 'border-b-4 border-scordi-500'} pb-2 inline`}>
            <a href={props.link} className={`font-medium text-lg text-gray-800 h-4 hover:text-scordi-500 pb-4`}>
                {props.text}
            </a>
        </div>
    );
};
