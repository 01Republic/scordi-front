import React, {memo} from 'react';
import {AbroadPayAmountCurrencyModal} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';
import {NewBillingHistoryModal} from 'src/components/pages/v3/share/modals/NewBillingHistoryModal';
import {useNewBillingHistoryModal} from '^v3/share/modals/NewBillingHistoryModal/NewBillingHistoryModalGroup/hook';
import {useBillingHistoryListOfSubscription} from '^models/BillingHistory/hook';
import {useDashboardSubscriptions} from '^models/Subscription/hook';

export const NewBillingHistoryModalInDashBoard = memo(() => {
    const {modalGroupClose} = useNewBillingHistoryModal();
    const {reload: reloadBillingHistoryList} = useBillingHistoryListOfSubscription();
    const {reload: reloadDashboardSubscriptions} = useDashboardSubscriptions();

    const billingHistoryCreatedCallback = () => {
        modalGroupClose();
    };

    const onFinish = () => {
        reloadBillingHistoryList();
        reloadDashboardSubscriptions();
    };

    return (
        <>
            <NewBillingHistoryModal onClose={billingHistoryCreatedCallback} onFinish={onFinish} />
            <AbroadPayAmountCurrencyModal />
        </>
    );
});
