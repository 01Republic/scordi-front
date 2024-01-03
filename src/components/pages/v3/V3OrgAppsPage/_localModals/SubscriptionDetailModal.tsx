import {memo} from 'react';
import {AppShowPageModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal';
import {useSubscriptionsV2} from '^models/Subscription/hook';

// [구독리스트p] 구독상세모달
export const SubscriptionDetailModal = memo(function SubscriptionDetailModal() {
    const {reload} = useSubscriptionsV2();

    return <AppShowPageModal onMemberChanged={() => reload()} />;
});
