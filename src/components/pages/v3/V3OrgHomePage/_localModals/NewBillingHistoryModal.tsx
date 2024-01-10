import React, {memo} from 'react';
import {AbroadPayAmountCurrencyModal} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';
import {NewBillingHistoryModal} from 'src/components/pages/v3/share/modals/NewBillingHistoryModal';
import {useNewBillingHistoryModal} from '^v3/share/modals/NewBillingHistoryModal/NewBillingHistoryModalGroup/hook';

export const NewBillingHistoryModalInDashBoard = memo(() => {
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
