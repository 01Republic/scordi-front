import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useBillingHistoryListOfSubscription} from '^models/BillingHistory/hook';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {appIdState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {AbroadPayAmountCurrencyModal} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';
import {NewBillingHistoryModalGroup} from '^v3/share/modals/NewBillingHistoryModal/NewBillingHistoryModalGroup';

export const NewBillingHistoryModalInAppShow = memo(() => {
    const {reload: reloadBillingHistory} = useBillingHistoryListOfSubscription();
    const {reload: reloadSubscriptionTableList} = useSubscriptionTableListAtom();
    const {loadCurrentSubscription} = useCurrentSubscription();
    const orgId = useRecoilValue(orgIdParamState);
    const appId = useRecoilValue(appIdState);

    const onCreate = () => {
        if (!appId) return;

        reloadBillingHistory(); // 결제 내역 reload
        reloadSubscriptionTableList(); // 구독 테이블 reload
        loadCurrentSubscription(orgId, appId); // 구독 상세 info reload
    };

    return (
        <>
            <NewBillingHistoryModalGroup onBillingHistoryCreated={onCreate} />
            <AbroadPayAmountCurrencyModal />
        </>
    );
});
