import {memo} from 'react';
import {BillingHistoryDetailModal} from '^v3/share/modals/BillingHistoryDetailModal';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';

export const BillingHistoryDetailModalInAppShow = memo(() => {
    const {reload} = useSubscriptionTableListAtom();

    return <BillingHistoryDetailModal onFinish={reload} />;
});
