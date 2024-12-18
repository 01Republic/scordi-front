import React, {memo, useState} from 'react';
import {TeamMemberInviteStatus, useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';

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
            <ListPage.ScopeButton
                active={memberStatus == TeamMemberInviteStatus.All}
                onClick={() => searchMembers(TeamMemberInviteStatus.All)}
            >
                전체
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={memberStatus == TeamMemberInviteStatus.BeforeInvite}
                onClick={() => searchMembers(TeamMemberInviteStatus.BeforeInvite)}
            >
                초대 전
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={memberStatus == TeamMemberInviteStatus.Inviting}
                onClick={() => searchMembers(TeamMemberInviteStatus.Inviting)}
            >
                가입 대기중
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={memberStatus == TeamMemberInviteStatus.Invited}
                onClick={() => searchMembers(TeamMemberInviteStatus.Invited)}
            >
                초대 완료
            </ListPage.ScopeButton>
        </div>
    );
});
