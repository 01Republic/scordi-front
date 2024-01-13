import React, {memo} from 'react';
import {useNewBillingHistoryModal} from '^v3/share/modals/NewBillingHistoryModal/NewBillingHistoryModalGroup/hook';
import {NewBillingHistoryModal} from '^v3/share/modals/NewBillingHistoryModal';
import {AbroadPayAmountCurrencyModal} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';

export const NewBillingHistoryModalInAppShow = memo(() => {
    const {modalGroupClose} = useNewBillingHistoryModal();

    const billingHistoryCreatedCallback = () => {
        modalGroupClose();
    };

    return (
        <>
            <NewBillingHistoryModal onClose={billingHistoryCreatedCallback} />
            <AbroadPayAmountCurrencyModal />
        </>
    );
});
