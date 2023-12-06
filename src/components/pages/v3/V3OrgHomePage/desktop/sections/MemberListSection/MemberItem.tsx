import {memo, useEffect, useState} from 'react';
import {Avatar} from '^components/Avatar';
import {FcOrgUnit} from 'react-icons/fc';
import {TeamMemberDto} from '^models/TeamMember/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {SubscriptionManager} from '^models/Subscription/manager';
import {SubscriptionAvatars} from '^v3/V3OrgHomePage/desktop/sections/MemberListSection/SubscriptionAvatars';
import {ApprovalStatus} from 'src/models/Membership/types';
import {useTeamMemberShowModalSubject} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/desktop/modals/hooks';

interface MemberItemProps {
    member: TeamMemberDto;
}

function collectSubscriptions() {}

// TODO: 231117 멤버상세카드에 데이터 연결해야 함.
export const MemberItem = memo((props: MemberItemProps) => {
    const {setCurrentTeamMember} = useTeamMemberShowModalSubject();
    const [subscriptions, setSubscriptions] = useState<SubscriptionDto[]>([]);
    const {member} = props;
    const approvalStatus = member.membership?.approvalStatus;

    useEffect(() => {
        const subs = (member.teams || []).flatMap((team) => team.subscriptions);
        const validSubs = subs.filter((e) => e);
        setSubscriptions(SubscriptionManager.init(validSubs).uniqueByProduct().all());
    }, [member]);

    const onClick = () => setCurrentTeamMember(member);

    return (
        <div
            className={`card card-compact bg-white shadow p-4 flex flex-col justify-between min-w-[300px] cursor-pointer transition-all hover:shadow-lg btn-animation ${
                approvalStatus === ApprovalStatus.PENDING && 'opacity-50'
            }`}
            onClick={onClick}
        >
            <div>
                <div className="mb-4 w-full flex justify-between">
                    <div>
                        <Avatar
                            src={member.profileImgUrl || undefined}
                            alt={member.name}
                            className="w-[40px] shadow-xl"
                        />
                    </div>
                    <div>
                        <SubscriptionAvatars subscriptions={subscriptions} max={6} />
                    </div>
                </div>

                <p className="mb-3 text-16">
                    <b>{member.name}</b>
                </p>

                <div className="w-full text-gray-500">
                    <div className="text-sm flex gap-1">
                        {(member.teams || []).map((team, i) => (
                            <div key={i} className="badge bg-scordi-light-100 text-gray-500">
                                {team.name}
                            </div>
                        ))}
                        &nbsp;
                    </div>
                    <div className="w-full flex gap-2 items-center">
                        <FcOrgUnit size={18} />
                        {/*<FcDoughnutChart size={18} />*/}
                        <p>{member.subscriptions?.length}개 이용 중</p>
                    </div>
                </div>
            </div>
        </div>
    );
});
MemberItem.displayName = 'MemberItem';
