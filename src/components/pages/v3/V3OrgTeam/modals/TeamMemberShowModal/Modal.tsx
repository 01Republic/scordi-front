import React, {memo} from 'react';
import {useTeamMembers} from '^models/TeamMember';
import {ModalTopbar} from '^v3/share/modals';
import {useTeamMemberShowModal} from './hooks';
import {EditButton} from './EditButton';
import {DeleteButton} from './DeleteButton';
import {TeamMemberShowBody} from './TeamMemberShowBody';

export const TeamMemberShowModal = memo(() => {
    const {Modal, hide} = useTeamMemberShowModal();
    const memberList = useTeamMembers();

    const DeleteButtonWrap = () => (
        <DeleteButton
            onFinish={() => {
                hide();
                if (memberList.isExist) memberList.reload();
            }}
        />
    );

    return (
        <Modal
            onClose={hide}
            wrapperClassName="modal-right"
            className="p-0 max-w-none sm:max-w-[32rem] z-50 no-scrollbar"
        >
            <ModalTopbar backBtnOnClick={hide} topbarPosition="sticky" rightButtons={[EditButton, DeleteButtonWrap]} />
            <TeamMemberShowBody />
        </Modal>
    );
});
