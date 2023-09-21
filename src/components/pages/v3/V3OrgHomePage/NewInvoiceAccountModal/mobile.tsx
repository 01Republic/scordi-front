import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/LandingPages/TastingPage/TastingItemDetailModal/ModalTopbar';
import {isOpenNewInvoiceAccountModalAtom} from './atom';
import {NewInvoiceAccountModalBody} from './body';

export const NewInvoiceAccountModalMobile = memo(() => {
    const {Modal, close} = useModal({isShowAtom: isOpenNewInvoiceAccountModalAtom});

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar backBtnOnClick={close} />

            <div className="px-5 pt-20">
                <NewInvoiceAccountModalBody />
            </div>
        </Modal>
    );
});
