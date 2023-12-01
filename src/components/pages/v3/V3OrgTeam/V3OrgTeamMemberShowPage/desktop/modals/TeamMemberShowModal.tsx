import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {TeamMemberShowBody} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/TeamMemberShowBody';
import {teamMemberShowModal} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/desktop/modals/atom';
import {DeleteTriggerButton, EditTriggerButton} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile/input';
import {useEditTeamMember} from '^models/TeamMember/hook';
import {useForm} from 'react-hook-form';
import {UpdateTeamMemberDto} from '^models/TeamMember/type';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {currentTeamMemberState} from '^models/TeamMember/atom';

export const TeamMemberShowModal = memo(() => {
    const {Modal, close} = useModal(teamMemberShowModal);
    const currentMember = useRecoilValue(currentTeamMemberState);
    const {updateFn, deleteFn} = useEditTeamMember();
    const form = useForm<UpdateTeamMemberDto>();
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar
                backBtnOnClick={close}
                topbarPosition="sticky"
                rightButtons={[
                    () => <EditTriggerButton onClick={() => updateFn(form.getValues(), currentMember)} />,
                    () => <DeleteTriggerButton onClick={() => deleteFn(orgId, currentMember)} />,
                ]}
            />
            <TeamMemberShowBody form={form} />
        </Modal>
    );
});
