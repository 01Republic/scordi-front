import {memo} from 'react';
import {AppShowPageModal} from 'src/components/pages/v3/share/modals/AppShowPageModal';
import {useDashboardSubscriptions} from '^models/Subscription/hook';

// [조직홈p] 구독상세모달
export const SubscriptionDetailModal = memo(function SubscriptionDetailModal() {
    const {reload} = useDashboardSubscriptions();

    return <AppShowPageModal onMemberChanged={() => reload()} onClose={() => reload()} />;
});
