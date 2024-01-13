import {memo} from 'react';
import {useTeamMembersInDashboard} from '^models/TeamMember';
import {TeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';
import {useMemberships} from '^models/Membership/hook';

/**
 * [조직홈p] 멤버 상세 모달
 */

export const TeamMemberDetailModal = memo(() => {
    const {reload} = useTeamMembersInDashboard();
    const {reload: loadMembership} = useMemberships();

    return (
        <TeamMemberShowModal
            onClose={() => {
                reload();
                loadMembership();
            }}
        />
    );
});
