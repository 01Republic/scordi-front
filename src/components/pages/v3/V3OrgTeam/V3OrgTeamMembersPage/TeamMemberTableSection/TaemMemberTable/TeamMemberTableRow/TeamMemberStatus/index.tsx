import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {TeamMemberDto} from '^models/TeamMember';
import {ApprovalStatus} from '^models/Membership/types';
import {currentUserAtom} from '^models/User/atom';
import {InviteButton} from './InviteButton';
import {ResendButton} from './ResendButton';
import {InvitedButton} from './InvitedButton';

interface TeamMemberStatusProps {
    teamMember: TeamMemberDto;
}

export const TeamMemberStatus = memo((props: TeamMemberStatusProps) => {
    const currentUser = useRecoilValue(currentUserAtom);
    const {teamMember} = props;

    if (!teamMember || !currentUser) return <></>;

    const memberships = currentUser.memberships || [];
    const {membership} = teamMember;
    const isMe = !!memberships.find((m) => m.id === membership?.id);

    return (
        <div className="capitalize text-sm text-gray-500">
            {/* 1. 초대를 보내지 않았고 **멤버레코드만 존재**하는 상태 : 초대버튼 노출 */}
            {!membership && <InviteButton teamMember={teamMember} />}

            {/* 2. 초대를 보냈으나 **워크스페이스 조인을 기다리는 중**인 멤버 : 재발송 버튼 노출 */}
            {membership && membership.approvalStatus === ApprovalStatus.PENDING && (
                <ResendButton teamMember={teamMember} />
            )}

            {/* 3. 초대를 보내어 **워크스페이스에 조인을 완료**한 멤버 일때 : 초대완료된 버튼 노출 */}
            {membership && membership.approvalStatus === ApprovalStatus.APPROVED && (
                <InvitedButton currentUser={currentUser} teamMember={teamMember} isMe={isMe} />
            )}
        </div>
    );
});
TeamMemberStatus.displayName = 'TeamMemberStatus';
