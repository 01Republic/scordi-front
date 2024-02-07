import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {BillingHistoryDetailModal} from '^v3/share/modals/BillingHistoryDetailModal';
import {appIdState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {useBillingHistoryListInSiblings, useBillingHistoryListOfSubscription} from '^models/BillingHistory/hook';

export const BillingHistoryDetailModalInAppShow = memo(() => {
    const {reload: reloadHistories} = useBillingHistoryListOfSubscription();
    const {reload: reloadSubscriptionTableList} = useSubscriptionTableListAtom();
    const {loadCurrentSubscription} = useCurrentSubscription();
    const {reload: reloadBillingHistoryListInSiblings} = useBillingHistoryListInSiblings();
    const orgId = useRecoilValue(orgIdParamState);
    const appId = useRecoilValue(appIdState);

    const onFinish = () => {
        if (!appId) return;

        reloadHistories(); // 결제 내역 reload
        reloadSubscriptionTableList(); // 구독 테이블 reload
        reloadBillingHistoryListInSiblings(); // 결제 내역의 결제내역 reload
        loadCurrentSubscription(orgId, appId); // 구독 상세 info reload
    };

    return <BillingHistoryDetailModal onFinish={onFinish} />;
});
