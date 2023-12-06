import React, {memo} from 'react';
import {useForm} from 'react-hook-form';
import {UpdateTeamMemberDto} from '^models/TeamMember';
import {useModal, ModalTopbar} from '^v3/share/modals';
import {teamMemberShowModal} from './atom';
import {EditButton} from './EditButton';
import {DeleteButton} from './DeleteButton';
import {TeamMemberShowBody} from './TeamMemberShowBody';

export const TeamMemberShowModal = memo(() => {
    const {Modal, close} = useModal(teamMemberShowModal);
    const form = useForm<UpdateTeamMemberDto>();

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" rightButtons={[EditButton, DeleteButton]} />
            <TeamMemberShowBody form={form} />
        </Modal>
    );
});
