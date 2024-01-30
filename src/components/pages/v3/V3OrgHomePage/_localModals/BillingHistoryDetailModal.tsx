import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useDashboardSubscriptions} from '^models/Subscription/hook';
import {useBillingHistoryListOfSubscription} from '^models/BillingHistory/hook';
import {BillingHistoryDetailModal} from '^v3/share/modals/BillingHistoryDetailModal';
import {appIdState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';

export const BillingHistoryDetailModalInDashBoard = memo(() => {
    const {reload: reloadDashboardSubscriptions} = useDashboardSubscriptions();
    const {reload: reloadBillingHistoryList} = useBillingHistoryListOfSubscription();
    const {loadCurrentSubscription} = useCurrentSubscription();
    const orgId = useRecoilValue(orgIdParamState);
    const appId = useRecoilValue(appIdState);

    const onFinish = () => {
        if (!appId) return;

        reloadBillingHistoryList(); // 결제 내역 reload
        reloadDashboardSubscriptions(); // 구독 테이블 reload
        loadCurrentSubscription(orgId, appId); // 구독 상세 info reload
    };

    return <BillingHistoryDetailModal onFinish={onFinish} />;
});
