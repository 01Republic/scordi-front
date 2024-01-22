import {memo} from 'react';
import {AppShowPageModal} from 'src/components/pages/v3/share/modals/AppShowPageModal';
import {useSubscriptionsV2, useSubscriptionTableListAtom} from '^models/Subscription/hook';

// [구독리스트p] 구독상세모달
export const SubscriptionDetailModal = memo(function SubscriptionDetailModal() {
    const {reload} = useSubscriptionTableListAtom();

    return <AppShowPageModal onFinish={() => reload()} />;
});
