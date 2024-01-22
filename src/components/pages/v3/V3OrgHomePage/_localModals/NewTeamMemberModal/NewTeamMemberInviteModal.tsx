import {memo} from 'react';
import {useTeamMembersInDashboard} from '^models/TeamMember';
import {InviteOrgMemberModal} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal';

/**
 * [조직홈p] 멤버 이메일 초대 모달
 */
export const NewTeamMemberInviteModal = memo(() => {
    const {reload} = useTeamMembersInDashboard();

    return <InviteOrgMemberModal onClose={() => reload()} />;
});
