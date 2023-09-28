import React, {memo} from 'react';
import {useSelectProductModal} from './hook';
import {useProductsOfAccounts} from '^v3/share/modals/AccountListModal/ProductChangeModal/use-products-of-accounts';

export const SelectProductModal = memo(() => {
    const {isShow, Modal, close, CloseButton} = useSelectProductModal();
    const {Product, Account} = useProductsOfAccounts(isShow);

    return (
        <Modal wrapperClassName="modal-bottom" className="pt-0">
            <h3 className="font-bold text-xl no-selectable -mx-6 p-6 bg-white sticky top-0 z-10 flex items-center justify-between">
                <span>서비스를 선택해주세요</span>
                <CloseButton />
            </h3>

            <div className="w-full flex flex-col gap-2 items-stretch pt-2"></div>
        </Modal>
    );
});
