import {memo} from 'react';
import {ButtonTo} from '^components/ButtonTo';
import {ApplicationDto} from '^types/application.type';
import {SyncHistoryDto, restartSyncButtonIsActive} from '^types/applicationSyncHistory.type';
import {createSyncHistory} from '^api/applicationSyncHistories.api';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {useCurrentSyncHistory, useSyncHistoryList} from '^hooks/useApplicationSyncHistories';
import {toast} from 'react-toastify';

interface SyncNowButtonProps {
    application: ApplicationDto;
    history: SyncHistoryDto | null;
}

export const SyncNowButton = memo((props: SyncNowButtonProps) => {
    const {application, history} = props;
    const {currentUser} = useCurrentUser();
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
        });
    };

    return <ButtonTo text="Sync Now" color="success" disabled={!isActive} onClick={onClick} />;
});
