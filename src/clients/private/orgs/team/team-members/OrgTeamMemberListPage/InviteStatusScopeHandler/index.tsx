import {useState} from 'react';
import {FindAllTeamMemberQueryDto, TeamMemberInviteStatus, useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';

interface InviteStatusScopeHandlerProps {
    search: (params?: Partial<FindAllTeamMemberQueryDto>) => void;
}

export function InviteStatusScopeHandler(props: InviteStatusScopeHandlerProps) {
    const {search} = props;
    const {query} = useTeamMembersInTeamMembersTable();
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
}
