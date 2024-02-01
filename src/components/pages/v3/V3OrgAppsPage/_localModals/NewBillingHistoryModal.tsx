import React, {memo} from 'react';
import {useNewBillingHistoryModal} from '^v3/share/modals/NewBillingHistoryModal/NewBillingHistoryModalGroup/hook';
import {NewBillingHistoryModal} from '^v3/share/modals/NewBillingHistoryModal';
import {AbroadPayAmountCurrencyModal} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';
import {useBillingHistoryListOfSubscription} from '^models/BillingHistory/hook';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {appIdState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

export const NewBillingHistoryModalInAppShow = memo(() => {
    const {modalGroupClose} = useNewBillingHistoryModal();
    const {reload: reloadBillingHistory} = useBillingHistoryListOfSubscription();
    const {reload: reloadSubscriptionTableList} = useSubscriptionTableListAtom();
    const {loadCurrentSubscription} = useCurrentSubscription();
    const orgId = useRecoilValue(orgIdParamState);
    const appId = useRecoilValue(appIdState);

    const billingHistoryCreatedCallback = () => {
        modalGroupClose();
    };

    const onFinish = () => {
        if (!appId) return;

        reloadBillingHistory(); // 결제 내역 reload
        reloadSubscriptionTableList(); // 구독 테이블 reload
        loadCurrentSubscription(orgId, appId); // 구독 상세 info reload
    };

    return (
        <>
            <NewBillingHistoryModal onFinish={onFinish} onClose={billingHistoryCreatedCallback} />
            <AbroadPayAmountCurrencyModal />
        </>
    );
});
