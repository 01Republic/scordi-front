import React, {memo, useEffect} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {NewInvoiceAccountModalBody} from './body';
import {connectInvoiceAccountStatus, InvoiceAccount, newInvoiceAccountModal} from './atom';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {newAppModal} from '^components/pages/v3/share/modals/NewAppModal/atom';
import {useSetRecoilState} from 'recoil';

export const NewInvoiceAccountModal = memo(() => {
    const {isShow: newAppModalIsShow} = useModal(newAppModal);
    const {Modal, close, isShow} = useModal(newInvoiceAccountModal);
    const setConnectStatus = useSetRecoilState(connectInvoiceAccountStatus);

    const onBack = () => close();

    useEffect(() => {
        setConnectStatus(InvoiceAccount.beforeLoad);
    }, [isShow]);

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
                <ModalTopbar backBtnOnClick={onBack} topbarPosition="sticky" />

                <div className="px-5 pt-20">
                    <NewInvoiceAccountModalBody />
                </div>
            </Modal>
        </>
    );
});
