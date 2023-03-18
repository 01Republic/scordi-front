import {memo, useCallback, useEffect} from 'react';
import {getApplication} from '^api/application.api';
import {useCurrentApplication} from '^hooks/useApplications';
import {useSyncHistoryList} from '^hooks/useApplicationSyncHistories';

export const ConnectStatusPooling = memo(() => {
    const {currentApplication, reload} = useCurrentApplication();
    const {fetchItems: fetchSyncHistories, pagination} = useSyncHistoryList();

    const pool = useCallback((id: number, reloadable: boolean) => {
        getApplication(id).then((res) => {
            const app = res.data;
            console.log('pooling app', app);

            if (app.isSyncRunning) {
                setTimeout(() => pool(app.id, true), 1000);
            } else {
                if (reloadable) {
                    reload();
                    fetchSyncHistories(app.id, pagination.currentPage, true);
                }
            }
        });
    }, []);

    useEffect(() => {
        if (!currentApplication) return;
        pool(currentApplication.id, false);
    }, [currentApplication]);

    return <></>;
});
