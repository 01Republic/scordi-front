import {memo} from 'react';
import {NewTeamMemberModal} from '^v3/share/modals/NewTeamMemberModal';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember';

export const NewTeamMemberModalInTeamMember = memo(() => {
    const {reload} = useTeamMembersInTeamMembersTable();

    return <NewTeamMemberModal onReload={reload} />;
});
