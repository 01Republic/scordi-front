import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {currentTeamMemberState, teamMemberApi} from '^models/TeamMember';
import {useToast} from '^hooks/useToast';
import {SubscriptionSelectModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/SubscriptionSelectModal';
import {useSubscriptionsInTeamMemberShowModal} from '^models/Subscription/hook';

interface SelectSubscriptionModalProps {
    onSubmit: () => any;
}

export const SelectSubscriptionModal = memo((props: SelectSubscriptionModalProps) => {
    const teamMember = useRecoilValue(currentTeamMemberState);
    const {toast} = useToast();
    const {reload: reloadTeamMemberShowModal} = useSubscriptionsInTeamMemberShowModal();

    const {onSubmit} = props;

    return (
        <SubscriptionSelectModal
            onConfirm={async (selectedIds) => {
                if (!teamMember) return;
                const addConnection = teamMemberApi.subscriptions.connect;
                const reqs = selectedIds.map((id) => addConnection(teamMember.id, id));
                await Promise.all(reqs);

                toast.success('추가했습니다.');
                reloadTeamMemberShowModal(); // 팀 멤버 상세 모달 Reload
                onSubmit(); // 멤버 테이블 reload
            }}
        />
    );
});
