import {memo} from 'react';
import {NewTeamMemberModal} from '^v3/V3OrgTeam/modals/NewTeamMemberModal';
import {useTeamMembers} from '^models/TeamMember';

/**
 * 대시보드 화면에서의 팀 멤버 생성 모달
 */
export const TeamMemberCreateModal = memo(function TeamMemberCreateModal() {
    const list = useTeamMembers();

    return (
        <NewTeamMemberModal
            onSubmit={() => {
                if (list.isExist) list.reload();
            }}
        />
    );
});
