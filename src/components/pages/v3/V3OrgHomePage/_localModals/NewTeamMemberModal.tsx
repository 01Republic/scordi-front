import {memo} from 'react';
import {NewTeamMemberModal} from '^v3/share/modals/NewTeamMemberModal';
import {useTeamMembersInDashboard} from '^models/TeamMember';

export const NewTeamMemberModalInDashBoard = memo(() => {
    const {reload} = useTeamMembersInDashboard();

    return <NewTeamMemberModal onSubmit={reload} />;
});
