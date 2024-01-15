import {memo} from 'react';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {TeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';

export const TeamMemberDetailModal = memo(() => {
    const {reload} = useTeamMembersInTeamMembersTable();

    return <TeamMemberShowModal onClose={() => reload()} />;
});
