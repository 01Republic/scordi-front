import React, {memo} from 'react';
import {BsPlusCircle} from 'react-icons/bs';
import {useSubscriptionSelectModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/SubscriptionSelectModal';
import {currentTeamMemberState, teamMemberApi, useTeamMember} from '^models/TeamMember';

interface AddButtonProps {}

export const AddButton = memo(function AddButton(props: AddButtonProps) {
    const {teamMember} = useTeamMember(currentTeamMemberState);
    const SubscriptionSelectModal = useSubscriptionSelectModal();
    const {} = props;

    const onClick = () => {
        if (!teamMember) return;

        // SubscriptionSelectModal 안에서 보여줄 구독목록을 불러옵니다.
        const getConnectable = teamMemberApi.subscriptions.connectable;
        const request = getConnectable(teamMember.id, {
            itemsPerPage: 0,
        });

        // 목록 요청을 집어넣어놓고
        SubscriptionSelectModal.searchForm.search(request);

        // SubscriptionSelectModal 를 엽니다.
        SubscriptionSelectModal.show();
    };

    return (
        <div className="tooltip tooltip-top tooltip-primary" data-tip="추가">
            <button onClick={onClick} className="relative text-indigo-400 hover:text-indigo-600 transition-all">
                <BsPlusCircle className="" size={24} strokeWidth={0.3} />
            </button>
        </div>
    );
});
