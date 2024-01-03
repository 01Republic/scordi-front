import {memo} from 'react';
import {TeamMemberSelectModal} from './TeamMemberSelectModal';
import {useToast} from '^hooks/useToast';
import {teamMemberApi, useTeamMembersV3} from '^models/TeamMember';
import {teamMemberListAtom} from './AppShowPageBody/tabs/TeamMemberListTab/atom';
import {useAppShowModal} from './hook';

interface SelectTeamMemberModalProps {
    afterChange?: () => any;
}

export const SelectTeamMemberModal = memo(function SelectTeamMemberModal(props: SelectTeamMemberModalProps) {
    const {toast} = useToast();
    const {subjectId: subscriptionId} = useAppShowModal();
    const {resetPage: resetTeamMembersOnSubscription} = useTeamMembersV3(
        teamMemberListAtom.result,
        teamMemberListAtom.query,
    );
    const {afterChange} = props;

    return (
        <TeamMemberSelectModal
            onConfirm={async (selectedIds) => {
                if (!subscriptionId || isNaN(subscriptionId)) return;

                const addConnection = teamMemberApi.subscriptions.connect;
                const reqs = selectedIds.map((teamMemberId) => addConnection(teamMemberId, subscriptionId));
                await Promise.all(reqs);

                toast.success('추가했습니다.');
                await resetTeamMembersOnSubscription();
                afterChange && afterChange();
            }}
        />
    );
});
