import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {c_ApprovalStatus, t_ApprovalStatus} from '^models/Membership/types';
import {useRecoilValue} from 'recoil';
import {currentUserAtom} from '^models/User/atom';
import {LeaveButton} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatus/LeaveButton';
import {InviteButton} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatus/InviteButton';
import {ResendButton} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatus/ResendButton';

interface TeamMemberStatusProps {
    teamMember: TeamMemberDto;
}

export const TeamMemberStatus = memo((props: TeamMemberStatusProps) => {
    const currentUser = useRecoilValue(currentUserAtom);
    const {teamMember} = props;

    if (!teamMember || !currentUser) return <></>;

    const {membership} = teamMember;
    const isMe = teamMember.email === currentUser.email;
    // TODO: 원래 아래와 같이 id 로 비교해야 합니다.
    //  (지금은 백엔드 이슈로 인해 membership 이 없는 문제가 있어, 단순 이메일로 비교하는데, 이건 꼼수이고 아삽으로 없어져야 합니다.)
    // const isMe = membership?.userId === currentUser.id;
    // console.log('currentUser.id', currentUser.id);
    // console.log('membership?.userId', membership?.userId);
    // console.log('isMe', isMe);

    return (
        <div className="capitalize text-sm text-gray-500">
            {/*본일일때 상태 버튼*/}
            {isMe && <LeaveButton user={currentUser} tooltipMsg="" />}

            {/*이메일로 초대한 멤버일때 상태 버튼*/}
            {!isMe && membership && <ResendButton teamMember={teamMember} />}

            {/*직접추가한 멤버일때 상태 버튼*/}
            {!membership && !isMe && <InviteButton teamMember={teamMember} />}
        </div>
    );
});
TeamMemberStatus.displayName = 'TeamMemberStatus';
