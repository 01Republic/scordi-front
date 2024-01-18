import {memo} from 'react';
import {useTeamMembersInDashboard} from '^models/TeamMember';
import {TeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';

/**
 * [조직홈p] 멤버 상세 모달
 */

export const TeamMemberDetailModal = memo(() => {
    const {reload} = useTeamMembersInDashboard();

    return <TeamMemberShowModal onSubmit={() => reload()} />;
});
