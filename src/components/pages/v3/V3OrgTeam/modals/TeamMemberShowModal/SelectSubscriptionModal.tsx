import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {currentTeamMemberState, teamMemberApi, useTeamMembersInDashboard} from '^models/TeamMember';
import {useToast} from '^hooks/useToast';
import {SubscriptionSelectModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/SubscriptionSelectModal';
import {useSubscriptionsInTeamMemberShowModal} from '^models/Subscription/hook';

export const SelectSubscriptionModal = memo(() => {
    const teamMember = useRecoilValue(currentTeamMemberState);
    const {toast} = useToast();
    const {reload} = useSubscriptionsInTeamMemberShowModal();
    const {reload: reloadMembersInDashboard} = useTeamMembersInDashboard();

    return (
        <SubscriptionSelectModal
            onConfirm={async (selectedIds) => {
                if (!teamMember) return;
                const addConnection = teamMemberApi.subscriptions.connect;
                const reqs = selectedIds.map((id) => addConnection(teamMember.id, id));
                await Promise.all(reqs);

                toast.success('추가했습니다.');
                reload();
                reloadMembersInDashboard();
            }}
        />
    );
});
