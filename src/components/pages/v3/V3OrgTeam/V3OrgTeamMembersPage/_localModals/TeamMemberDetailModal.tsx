import {memo} from 'react';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {TeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';

/**
 * [멤버관리p] 멤버 상세 모달
 */
export const TeamMemberDetailModal = memo(() => {
    const {reload} = useTeamMembersInTeamMembersTable();

    return <TeamMemberShowModal onSubmit={() => reload()} />;
});
