import React, {memo} from 'react';
import {BsPlusCircle} from 'react-icons/bs';
import {useAppShowModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal';
import {teamMemberApi} from '^models/TeamMember';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useTeamMemberSelectModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/TeamMemberSelectModal/hook';

export const AddButton = memo(function AddButton() {
    const orgId = useRecoilValue(orgIdParamState);
    const {subjectId: subscriptionId} = useAppShowModal();
    const TeamMemberSelectModal = useTeamMemberSelectModal();

    const onClick = async () => {
        if (!orgId || isNaN(orgId)) return;
        if (!subscriptionId) return;

        // SubscriptionSelectModal 안에서 보여줄 멤버목록을 불러옵니다.
        const alreadyMembers = await teamMemberApi
            .index(orgId, {
                where: {
                    organizationId: orgId,
                    subscriptions: {
                        // @ts-ignore
                        id: subscriptionId,
                    },
                },
                itemsPerPage: 0,
            })
            .then((res) => res.data);
        const filterIds = alreadyMembers.items.map((m) => m.id);
        const allMembers = await teamMemberApi.index(orgId, {
            where: {organizationId: orgId},
            itemsPerPage: 0,
        });
        const selectableMembers = allMembers.data.items.filter((teamMember) => !filterIds.includes(teamMember.id));
        await TeamMemberSelectModal.show(selectableMembers);
    };

    return (
        <div className="tooltip tooltip-top tooltip-primary" data-tip="추가">
            <button onClick={onClick} className="relative text-indigo-400 hover:text-indigo-600 transition-all">
                <BsPlusCircle className="" size={24} strokeWidth={0.3} />
            </button>
        </div>
    );
});
