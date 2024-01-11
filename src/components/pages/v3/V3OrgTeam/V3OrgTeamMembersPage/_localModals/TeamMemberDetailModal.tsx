import {memo} from 'react';
import {useTeamMembers} from '^models/TeamMember';
import {TeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';

export const TeamMemberDetailModal = memo(() => {
    const list = useTeamMembers();

    return (
        <TeamMemberShowModal
            onClose={() => {
                if (!list.isExist) list.reload();
            }}
        />
    );
});
