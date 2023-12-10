import {memo} from 'react';
import {TeamMemberSelectModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/TeamMemberSelectModal';
import {useToast} from '^hooks/useToast';
import {teamMemberApi, useTeamMembersV3} from '^models/TeamMember';
import {teamMemberListAtom} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/AppShowPageBody/tabs/TeamMemberListTab/atom';
import {useAppShowModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/hook';

export const SelectTeamMemberModal = memo(function SelectTeamMemberModal() {
    const {toast} = useToast();
    const {subjectId: subscriptionId} = useAppShowModal();
    const {resetPage: resetTeamMembersOnSubscription} = useTeamMembersV3(
        teamMemberListAtom.result,
        teamMemberListAtom.query,
    );

    return (
        <TeamMemberSelectModal
            onConfirm={async (selectedIds) => {
                if (!subscriptionId || isNaN(subscriptionId)) return;

                const addConnection = teamMemberApi.subscriptions.connect;
                const reqs = selectedIds.map((teamMemberId) => addConnection(teamMemberId, subscriptionId));
                await Promise.all(reqs);

                toast.success('추가했습니다.');
                await resetTeamMembersOnSubscription();
            }}
        />
    );
});
