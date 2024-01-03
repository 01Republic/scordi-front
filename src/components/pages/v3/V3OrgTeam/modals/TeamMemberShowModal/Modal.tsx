import React, {memo} from 'react';
import {useTeamMembers} from '^models/TeamMember';
import {ModalTopbar} from '^v3/share/modals';
import {useTeamMemberShowModal} from './hooks';
import {EditButton} from './EditButton';
import {DeleteButton} from './DeleteButton';
import {TeamMemberShowBody} from './TeamMemberShowBody';
import {SelectSubscriptionModal} from './SelectSubscriptionModal';

export const TeamMemberShowModal = memo(() => {
    const {Modal, hide} = useTeamMemberShowModal();
    const memberList = useTeamMembers();

    const onClose = () => {
        hide();
        if (memberList.isExist) memberList.reload();
    };

    const DeleteButtonWrap = () => <DeleteButton onFinish={onClose} />;

    return (
        <>
            <Modal
                onClose={onClose}
                wrapperClassName="modal-right"
                className="p-0 max-w-none sm:max-w-[32rem] z-50 no-scrollbar"
            >
                <ModalTopbar
                    backBtnOnClick={onClose}
                    topbarPosition="sticky"
                    rightButtons={[EditButton, DeleteButtonWrap]}
                />
                <TeamMemberShowBody />
            </Modal>
            <SelectSubscriptionModal />
        </>
    );
});
