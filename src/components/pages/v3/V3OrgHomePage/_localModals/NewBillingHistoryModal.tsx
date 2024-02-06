import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useBillingHistoryListOfSubscription} from '^models/BillingHistory/hook';
import {useDashboardSubscriptions} from '^models/Subscription/hook';
import {AbroadPayAmountCurrencyModal} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';
import {useNewBillingHistoryModal} from '^v3/share/modals/NewBillingHistoryModal/NewBillingHistoryModalGroup/hook';
import {appIdState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {NewBillingHistoryModalGroup} from '^v3/share/modals/NewBillingHistoryModal/NewBillingHistoryModalGroup';

export const NewBillingHistoryModalInDashBoard = memo(() => {
    const {modalGroupClose} = useNewBillingHistoryModal();
    const {reload: reloadBillingHistoryList} = useBillingHistoryListOfSubscription();
    const {reload: reloadDashboardSubscriptions} = useDashboardSubscriptions();
    const {loadCurrentSubscription} = useCurrentSubscription();
    const orgId = useRecoilValue(orgIdParamState);
    const appId = useRecoilValue(appIdState);

    const billingHistoryCreatedCallback = () => {
        modalGroupClose();
    };

    const onFinish = () => {
        if (!appId) return;

        reloadBillingHistoryList(); // 결제 내역 reload
        reloadDashboardSubscriptions(); // 구독 테이블 reload
        loadCurrentSubscription(orgId, appId); // 구독 상세 info reload
    };

    return (
        <>
            <NewBillingHistoryModalGroup onClose={billingHistoryCreatedCallback} onBillingHistoryCreated={onFinish} />
            <AbroadPayAmountCurrencyModal />
        </>
    );
});
