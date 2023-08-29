import {memo} from 'react';
import {ButtonTo} from '^components/ButtonTo';
import {SubscriptionDto} from '^types/subscription.type';
import {SyncHistoryDto, restartSyncButtonIsActive} from '^types/subscriptionSyncHistory.type';
import {createSyncHistory} from '^api/subscriptionSyncHistories.api';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {useCurrentSyncHistory, useSyncHistoryList} from '^hooks/useApplicationSyncHistories';
import {toast} from 'react-toastify';
import {useCurrentApplication} from '^hooks/useApplications';

interface SyncNowButtonProps {
    application: SubscriptionDto;
    history: SyncHistoryDto | null;
}

export const SyncNowButton = memo((props: SyncNowButtonProps) => {
    const {application, history} = props;
    const {currentUser} = useCurrentUser();
    const {reload: reloadCurrentApp} = useCurrentApplication();
    const {fetchItems: fetchSyncHistories, pagination} = useSyncHistoryList();
    const {fetchCurrentSyncHistory} = useCurrentSyncHistory();

    const {prototype} = application;

    const isActive = history ? restartSyncButtonIsActive(history) : true;

    const onClick = () => {
        if (!application || !currentUser) return;
        createSyncHistory(application.id, {
            runnerId: currentUser.id,
            content: `Synchronize manually.`,
        }).then(() => {
            toast.success('New Sync started!');
            fetchSyncHistories(application.id, pagination.currentPage, true);
            fetchCurrentSyncHistory(application.id);
            reloadCurrentApp();
        });
    };

    return <ButtonTo text="Sync Now" color="success" disabled={!isActive} onClick={onClick} />;
});
