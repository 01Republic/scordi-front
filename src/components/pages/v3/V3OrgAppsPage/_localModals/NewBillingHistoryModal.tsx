import React, {memo} from 'react';
import {useNewBillingHistoryModal} from '^v3/share/modals/NewBillingHistoryModal/NewBillingHistoryModalGroup/hook';
import {NewBillingHistoryModal} from '^v3/share/modals/NewBillingHistoryModal';
import {AbroadPayAmountCurrencyModal} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';
import {useBillingHistoryListOfSubscription} from '^models/BillingHistory/hook';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';

export const NewBillingHistoryModalInAppShow = memo(() => {
    const {modalGroupClose} = useNewBillingHistoryModal();
    const {reload: reloadBillingHistory} = useBillingHistoryListOfSubscription();
    const {reload: reloadSubscriptionTableList} = useSubscriptionTableListAtom();

    const billingHistoryCreatedCallback = () => {
        modalGroupClose();
    };

    const onFinish = () => {
        reloadBillingHistory();
        reloadSubscriptionTableList();
    };

    return (
        <>
            <NewBillingHistoryModal onFinish={onFinish} onClose={billingHistoryCreatedCallback} />
            <AbroadPayAmountCurrencyModal />
        </>
    );
});
