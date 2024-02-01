import React, {memo, useEffect} from 'react';
import {ModalTopbar} from '^v3/share/modals';
import {useTeamMemberShowModal} from './hooks';
import {EditButton} from './EditButton';
import {DeleteButton} from './DeleteButton';
import {TeamMemberShowBody} from './TeamMemberShowBody';
import {SelectSubscriptionModal} from './SelectSubscriptionModal';
import {useResetRecoilState} from 'recoil';
import {isTeamMemberEditModeAtom} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/atom';

interface TeamMemberShowModalProps {
    onClose?: () => any;
    onSubmit?: () => any;
}
export const TeamMemberShowModal = memo((props: TeamMemberShowModalProps) => {
    const {Modal, close, hide, isShow} = useTeamMemberShowModal();
    const resetIsEditMode = useResetRecoilState(isTeamMemberEditModeAtom);
    const {onClose: _onClose, onSubmit} = props;

    useEffect(() => {
        resetIsEditMode();
    }, [isShow]);

    const onClose = () => {
        close();
        _onClose && _onClose();
    };

    const onFinish = () => {
        hide();
        onSubmit && onSubmit();
    };

    const DeleteButtonWrap = () => <DeleteButton onFinish={onFinish} />;

    return (
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
            <TeamMemberShowBody onSubmit={onSubmit} />
        </Modal>
    );
});
