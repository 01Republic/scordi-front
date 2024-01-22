import {memo} from 'react';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {InviteOrgMemberModal} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal';

/**
 * 멤버관리 화면에서의 팀 멤버 초대 모달
 */
export const TeamMemberInviteModal = memo(() => {
    const {reload} = useTeamMembersInTeamMembersTable();

    return <InviteOrgMemberModal onClose={() => reload()} />;
});
