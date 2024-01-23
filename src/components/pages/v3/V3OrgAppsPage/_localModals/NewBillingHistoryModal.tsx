import React, {memo} from 'react';
import {useNewBillingHistoryModal} from '^v3/share/modals/NewBillingHistoryModal/NewBillingHistoryModalGroup/hook';
import {NewBillingHistoryModal} from '^v3/share/modals/NewBillingHistoryModal';
import {AbroadPayAmountCurrencyModal} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';
import {useBillingHistoryListOfSubscription} from '^models/BillingHistory/hook';

export const NewBillingHistoryModalInAppShow = memo(() => {
    const {modalGroupClose} = useNewBillingHistoryModal();
    const {reload: reloadBillingHistory} = useBillingHistoryListOfSubscription();
    const billingHistoryCreatedCallback = () => {
        modalGroupClose();
    };

    const onFinish = () => {
        console.log('onFinish');
        reloadBillingHistory();
    };

    return (
        <>
            <NewBillingHistoryModal onFinish={onFinish} onClose={billingHistoryCreatedCallback} />
            <AbroadPayAmountCurrencyModal />
        </>
    );
});
