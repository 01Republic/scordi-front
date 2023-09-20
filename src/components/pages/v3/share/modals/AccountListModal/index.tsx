import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {accountListModal} from './atom';
import {ModalLikeTopbar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeTopbar';

export const AccountListModal = memo(() => {
    const {Modal, close} = useModal(accountListModal);

    const onBack = () => close();

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalLikeTopbar backBtnOnClick={onBack} topbarPosition="sticky" />
            <div></div>
        </Modal>
    );
});
