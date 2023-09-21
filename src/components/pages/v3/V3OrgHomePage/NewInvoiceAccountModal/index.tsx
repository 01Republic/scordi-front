import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import Image from 'next/image';
import {isOpenNewInvoiceAccountModalAtom} from './atom';
import {NewInvoiceAccountModalBody} from './body';

export const NewInvoiceAccountModal = memo(() => {
    const {Modal} = useModal({isShowAtom: isOpenNewInvoiceAccountModalAtom});

    return (
        <Modal className="py-12">
            <div className="flex items-center justify-center gap-3 mb-10">
                <Image src="/logo-transparent.png" alt="Scordi logo" width={48} height={48} />
                <span className="text-4xl font-bold">scordi</span>
            </div>
            <div className="text-center">
                <NewInvoiceAccountModalBody />
            </div>
        </Modal>
    );
});
