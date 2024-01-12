import {memo} from 'react';
import {useTeamMembers_Dashboard} from '^models/TeamMember';
import {CreateTeamMemberModal} from '^v3/share/modals/NewTeamMemberModal/CreateTeamMemberModal/Modal';

/**
 * [조직홈p] 멤버 직접추가 모달
 */
export const TeamMemberCreateModal = memo(function TeamMemberCreateModal() {
    const {reload} = useTeamMembers_Dashboard();

    return (
        <CreateTeamMemberModal
            onSubmit={() => {
                reload();
            }}
        />
    );
});
