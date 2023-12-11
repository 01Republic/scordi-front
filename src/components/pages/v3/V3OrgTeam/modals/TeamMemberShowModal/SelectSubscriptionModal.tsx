import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {currentTeamMemberState, teamMemberApi} from '^models/TeamMember';
import {useToast} from '^hooks/useToast';
import {useSubscriptionsV3} from '^models/Subscription/hook';
import {
    pagedSubscriptionForTeamMemberShowModalState as resultAtom,
    subscriptionQueryForTeamMemberShowModalState as queryAtom,
} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/TeamMemberShowBody/tabs/SubscriptionListTab/atom';
import {SubscriptionSelectModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/SubscriptionSelectModal';

export const SelectSubscriptionModal = memo(() => {
    const teamMember = useRecoilValue(currentTeamMemberState);
    const {toast} = useToast();
    const Subscriptions = useSubscriptionsV3(resultAtom, queryAtom);

    return (
        <SubscriptionSelectModal
            onConfirm={async (selectedIds) => {
                if (!teamMember) return;
                const addConnection = teamMemberApi.subscriptions.connect;
                const reqs = selectedIds.map((id) => addConnection(teamMember.id, id));
                await Promise.all(reqs);

                toast.success('추가했습니다.');
                Subscriptions.reload();
            }}
        />
    );
});
