import React, {memo} from 'react';
import {FcOrgUnit} from 'react-icons/fc';
import {TeamMemberDto} from '^models/TeamMember/type';
import {SubscriptionAvatars} from '^v3/V3OrgHomePage/desktop/sections/MemberListSection/SubscriptionAvatars';
import {ApprovalStatus} from 'src/models/Membership/types';
import {useTeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/hooks';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';

interface MemberItemProps {
    member: TeamMemberDto;
}

export const MemberItem = memo((props: MemberItemProps) => {
    const teamMemberShowModal = useTeamMemberShowModal();
    const {member} = props;
    const subscriptions = member.subscriptions || [];
    const approvalStatus = member.membership?.approvalStatus;

    const onClick = () => teamMemberShowModal.show(member);

    return (
        <div
            className={`card card-compact bg-white shadow p-4 flex flex-col justify-between min-w-[240px] cursor-pointer transition-all hover:shadow-lg btn-animation ${
                approvalStatus === ApprovalStatus.PENDING && 'opacity-50'
            }`}
            onClick={onClick}
        >
            <div>
                <div className="mb-4 w-full flex justify-between">
                    <div>
                        <TeamMemberAvatar teamMember={member} className="w-[40px] h-[40px] shadow-xl" />
                    </div>
                    <div>
                        <SubscriptionAvatars subscriptions={subscriptions} max={6} />
                    </div>
                </div>

                <p className="mb-3 text-16 overflow-hidden" style={{textOverflow: 'ellipsis'}}>
                    <b>{member.name}</b>
                </p>

                <div className="w-full text-gray-500 flex items-center justify-between">
                    <div className="text-sm flex gap-1">
                        {member.validTeams.map((team, i) => (
                            <div key={i} className="badge bg-scordi-light-100 text-gray-500">
                                {team.name}
                            </div>
                        ))}
                        &nbsp;
                    </div>
                    <div className="flex gap-2 items-center">
                        <FcOrgUnit size={18} />
                        {/*<FcDoughnutChart size={18} />*/}
                        <p>{member.subscriptions?.length?.toLocaleString()}개 이용 중</p>
                    </div>
                </div>
            </div>
        </div>
    );
});
MemberItem.displayName = 'MemberItem';
