import {useState} from 'react';
import {FindAllTeamMemberQueryDto, TeamMemberInviteStatus, useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {useTranslation} from 'next-i18next';

interface InviteStatusScopeHandlerProps {
    search: (params?: Partial<FindAllTeamMemberQueryDto>) => void;
}

export function InviteStatusScopeHandler(props: InviteStatusScopeHandlerProps) {
    const {t} = useTranslation('members');
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
                {t('scope.all') as string}
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={memberStatus == TeamMemberInviteStatus.BeforeInvite}
                onClick={() => searchMembers(TeamMemberInviteStatus.BeforeInvite)}
            >
                {t('scope.beforeInvite') as string}
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={memberStatus == TeamMemberInviteStatus.Inviting}
                onClick={() => searchMembers(TeamMemberInviteStatus.Inviting)}
            >
                {t('scope.inviting') as string}
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={memberStatus == TeamMemberInviteStatus.Invited}
                onClick={() => searchMembers(TeamMemberInviteStatus.Invited)}
            >
                {t('scope.invited') as string}
            </ListPage.ScopeButton>
        </div>
    );
}
