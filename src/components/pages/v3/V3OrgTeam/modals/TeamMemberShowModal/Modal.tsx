import React, {memo} from 'react';
import {ModalTopbar} from '^v3/share/modals';
import {useTeamMemberShowModal} from './hooks';
import {EditButton} from './EditButton';
import {DeleteButton} from './DeleteButton';
import {TeamMemberShowBody} from './TeamMemberShowBody';
import {SelectSubscriptionModal} from './SelectSubscriptionModal';
interface TeamMemberShowModalProps {
    onClose: () => any;
}
export const TeamMemberShowModal = memo((props: TeamMemberShowModalProps) => {
    const {Modal, hide} = useTeamMemberShowModal();
    const {onClose: _onClose} = props;

    const onClose = () => {
        hide();
        _onClose();
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
