import {memo} from 'react';
import {ButtonTo} from '^components/ButtonTo';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {
    SyncHistoryDto,
    restartSyncButtonIsActive,
} from '^models/SubscriptionSyncHistory/type/subscriptionSyncHistory.type';
import {useCurrentUser} from '^models/User/hook';
import {useCurrentSyncHistory, useSyncHistoryList} from '^models/SubscriptionSyncHistory/hook';
import {toast} from 'react-toastify';
import {useCurrentSubscription} from '^models/Subscription/hook';
import {syncHistory} from '^models/SubscriptionSyncHistory/api';

interface SyncNowButtonProps {
    subscription: SubscriptionDto;
    history: SyncHistoryDto | null;
}

export const SyncNowButton = memo((props: SyncNowButtonProps) => {
    const {subscription, history} = props;
    const {currentUser} = useCurrentUser();
    const {reload: reloadCurrentApp} = useCurrentSubscription();
    const {fetchItems: fetchSyncHistories, pagination} = useSyncHistoryList();
    const {fetchCurrentSyncHistory} = useCurrentSyncHistory();

    const {product} = subscription;

    const isActive = history ? restartSyncButtonIsActive(history) : true;

    const onClick = () => {
        if (!subscription || !currentUser) return;
        syncHistory
            .create(subscription.id, {
                runnerId: currentUser.id,
                content: `Synchronize manually.`,
            })
            .then(() => {
                toast.success('New Sync started!');
                fetchSyncHistories(subscription.id, pagination.currentPage, true);
                fetchCurrentSyncHistory(subscription.id);
                reloadCurrentApp();
            });
    };

    return <ButtonTo text="Sync Now" color="success" disabled={!isActive} onClick={onClick} />;
});
