import {memo} from 'react';
import {useTeamMembers} from '^models/TeamMember';
import {TeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';
import {useMemberships} from '^models/Membership/hook';

export const TeamMemberDetailModal = memo(() => {
    const list = useTeamMembers();
    const {reload: loadMembership} = useMemberships();

    return (
        <TeamMemberShowModal
            onClose={() => {
                if (!list.isExist) {
                    list.reload();
                    loadMembership();
                }
            }}
        />
    );
});
