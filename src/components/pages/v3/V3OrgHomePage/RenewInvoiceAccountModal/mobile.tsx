import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {RenewInvoiceAccountModalBody} from './body';
import {renewInvoiceAccountModal} from './atom';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';

export const RenewInvoiceAccountModalMobile = memo(() => {
    const {Modal, close} = useModal(renewInvoiceAccountModal);

    const onBack = () => close();

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar backBtnOnClick={onBack} topbarPosition="sticky" />

            <div className="px-5 pt-20">
                <RenewInvoiceAccountModalBody />
            </div>
        </Modal>
    );
});
