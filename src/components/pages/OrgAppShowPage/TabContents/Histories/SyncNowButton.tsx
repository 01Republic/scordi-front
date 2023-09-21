import {memo} from 'react';
import {ButtonTo} from '^components/ButtonTo';
import {SubscriptionDto} from '^types/subscription.type';
import {SyncHistoryDto, restartSyncButtonIsActive} from '^types/subscriptionSyncHistory.type';
import {createSyncHistory} from '^api/subscriptionSyncHistories.api';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {useCurrentSyncHistory, useSyncHistoryList} from '^hooks/useSubscriptionSyncHistories';
import {toast} from 'react-toastify';
import {useCurrentSubscription} from '^hooks/useSubscriptions';

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
        createSyncHistory(subscription.id, {
            runnerId: currentUser.id,
            content: `Synchronize manually.`,
        }).then(() => {
            toast.success('New Sync started!');
            fetchSyncHistories(subscription.id, pagination.currentPage, true);
            fetchCurrentSyncHistory(subscription.id);
            reloadCurrentApp();
        });
    };

    return <ButtonTo text="Sync Now" color="success" disabled={!isActive} onClick={onClick} />;
});
