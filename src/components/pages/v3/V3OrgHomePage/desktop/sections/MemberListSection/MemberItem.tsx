import {memo, useEffect, useState} from 'react';
import {Avatar, Avatar2} from '^components/Avatar';
import {FcConferenceCall, FcDoughnutChart, FcKey, FcLink, FcOrgUnit} from 'react-icons/fc';
import {useTeamMemberModalSubject} from '../../modals/TeamMemberModal/hooks';
import {TeamMemberDto} from '^models/TeamMember/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {SubscriptionManager} from '^models/Subscription/manager';
import {SubscriptionAvatars} from '^v3/V3OrgHomePage/desktop/sections/MemberListSection/SubscriptionAvatars';

interface MemberItemProps {
    member: TeamMemberDto;
}

function collectSubscriptions() {}

// TODO: 231117 멤버상세카드에 데이터 연결해야 함.
export const MemberItem = memo((props: MemberItemProps) => {
    const {member} = props;
    const {setSubjectMember} = useTeamMemberModalSubject();
    const [subscriptions, setSubscriptions] = useState<SubscriptionDto[]>([]);

    useEffect(() => {
        const subs = (member.teams || []).flatMap((team) => team.subscriptions);
        const validSubs = subs.filter((e) => e);
        setSubscriptions(SubscriptionManager.init(validSubs).uniqueByProduct().all());
    }, [member]);

    const onClick = () => setSubjectMember(member);

    return (
        <div
            className="card card-compact bg-white shadow p-4 flex flex-col justify-between min-w-[300px] cursor-pointer transition-all hover:shadow-lg btn-animation"
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
                        {member.teams.map((team, i) => (
                            <div className="badge bg-scordi-light-100 text-gray-500">{team.name}</div>
                        ))}
                        &nbsp;
                    </div>
                    <div className="w-full flex gap-2 items-center">
                        <FcOrgUnit size={18} />
                        {/*<FcDoughnutChart size={18} />*/}
                        <p>{subscriptions.length}개 이용 중</p>
                    </div>
                </div>
            </div>
        </div>
    );
});
MemberItem.displayName = 'MemberItem';
