import {memo} from 'react';
import {TeamMemberSelectModal} from './TeamMemberSelectModal';
import {useToast} from '^hooks/useToast';
import {teamMemberApi, useTeamMembersInSubscriptionShowModal} from '^models/TeamMember';
import {useAppShowModal} from './hook';

interface SelectTeamMemberModalProps {
    afterChange?: () => any;
}

export const SelectTeamMemberModal = memo(function SelectTeamMemberModal(props: SelectTeamMemberModalProps) {
    const {toast} = useToast();
    const {subjectId: subscriptionId} = useAppShowModal();
    const {resetPage: resetTeamMembersOnSubscription} = useTeamMembersInSubscriptionShowModal();
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
