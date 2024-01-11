import {memo} from 'react';
import {useTeamMembers_Dashboard} from '^models/TeamMember';
import {InviteOrgMemberModal} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal';

/**
 * [조직홈p] 멤버 이메일 초대 모달
 */
export const NewTeamMemberInviteModal = memo(() => {
    const {reload} = useTeamMembers_Dashboard();

    return <InviteOrgMemberModal onClose={() => reload()} />;
});
