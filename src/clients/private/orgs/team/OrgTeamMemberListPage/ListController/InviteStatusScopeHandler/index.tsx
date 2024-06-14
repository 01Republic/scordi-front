import React, {memo, useState} from 'react';
import {ScopeButton} from './ScopeButton';
import {TeamMemberInviteStatus, useTeamMembersInTeamMembersTable} from '^models/TeamMember';

export const InviteStatusScopeHandler = memo(function InviteStatusScopeHandler() {
    const {search, query} = useTeamMembersInTeamMembersTable();
    const [memberStatus, setMemberStatus] = useState(TeamMemberInviteStatus.All);

    const searchMembers = (inviteStatus: TeamMemberInviteStatus) => {
        setMemberStatus(inviteStatus);
        return search({
            ...query,
            inviteStatus,
            page: 1,
            itemsPerPage: 30,
        });
    };

    return (
        <div className="flex items-center gap-2">
            <ScopeButton
                active={memberStatus == TeamMemberInviteStatus.All}
                onClick={() => searchMembers(TeamMemberInviteStatus.All)}
            >
                전체
            </ScopeButton>
            <ScopeButton
                active={memberStatus == TeamMemberInviteStatus.BeforeInvite}
                onClick={() => searchMembers(TeamMemberInviteStatus.BeforeInvite)}
            >
                초대 전
            </ScopeButton>
            <ScopeButton
                active={memberStatus == TeamMemberInviteStatus.Inviting}
                onClick={() => searchMembers(TeamMemberInviteStatus.Inviting)}
            >
                가입 대기중
            </ScopeButton>
            <ScopeButton
                active={memberStatus == TeamMemberInviteStatus.Invited}
                onClick={() => searchMembers(TeamMemberInviteStatus.Invited)}
            >
                초대 완료
            </ScopeButton>
        </div>
    );
});
