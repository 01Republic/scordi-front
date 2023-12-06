import React, {memo} from 'react';
import {useForm} from 'react-hook-form';
import {useRecoilValue} from 'recoil';
import {useEditTeamMember, UpdateTeamMemberDto, currentTeamMemberState} from '^models/TeamMember';
import {orgIdParamState} from '^atoms/common';
import {useModal, ModalTopbar} from '^v3/share/modals';
import {DeleteTriggerButton, EditTriggerButton} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile/input';
import {teamMemberShowModal} from './atom';
import {TeamMemberShowBody} from './TeamMemberShowBody';

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
                rightButtons={[() => <EditTriggerButton onClick={() => updateFn(form.getValues(), currentMember)} />]}
            />
            <TeamMemberShowBody form={form} />
        </Modal>
    );
});
