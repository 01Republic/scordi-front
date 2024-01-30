import {memo} from 'react';
import {BillingHistoryDetailModal} from '^v3/share/modals/BillingHistoryDetailModal';
import {useDashboardSubscriptions} from '^models/Subscription/hook';

export const BillingHistoryDetailModalInDashBoard = memo(() => {
    const {reload} = useDashboardSubscriptions();

    return <BillingHistoryDetailModal onFinish={reload} />;
});
