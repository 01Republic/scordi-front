import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {NewInvoiceAccountModalBody} from './body';
import {ModalLikeTopbar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeTopbar';
import {atom} from 'recoil';
import {newInvoiceAccountModal} from './atom';

export const accountListModal = {
    isShowAtom: atom({
        key: 'v3/accountListModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'accountListModal',
};

export const NewInvoiceAccountModalMobile = memo(() => {
    const {Modal, close} = useModal(newInvoiceAccountModal);

    const onBack = () => close();

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalLikeTopbar backBtnOnClick={onBack} topbarPosition="sticky" />

            <div className="px-5 pt-20">
                <NewInvoiceAccountModalBody />
            </div>
        </Modal>
    );
});
