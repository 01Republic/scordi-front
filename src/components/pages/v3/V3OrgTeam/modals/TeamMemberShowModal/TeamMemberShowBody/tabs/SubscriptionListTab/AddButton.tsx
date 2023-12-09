import React, {memo} from 'react';
import {BsPlusCircle} from 'react-icons/bs';
import {useSubscriptionSelectModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/SubscriptionSelectModal';
import {currentTeamMemberState, teamMemberApi, useTeamMember} from '^models/TeamMember';

interface AddButtonProps {
    onAdd: () => any;
}

export const AddButton = memo(function AddButton(props: AddButtonProps) {
    const {teamMember} = useTeamMember(currentTeamMemberState);
    const SubscriptionSelectModal = useSubscriptionSelectModal();
    const {onAdd} = props;

    const onClick = () => {
        if (!teamMember) return;

        const request = teamMemberApi.subscriptions.connectable(teamMember.id, {
            itemsPerPage: 0,
        });
        SubscriptionSelectModal.show();
        SubscriptionSelectModal.searchForm.search(request);
        // onAdd();
    };

    return (
        <div className="tooltip tooltip-top tooltip-primary" data-tip="추가">
            <button onClick={onClick} className="relative text-indigo-400 hover:text-indigo-600 transition-all">
                <BsPlusCircle className="" size={24} strokeWidth={0.3} />
            </button>
        </div>
    );
});
