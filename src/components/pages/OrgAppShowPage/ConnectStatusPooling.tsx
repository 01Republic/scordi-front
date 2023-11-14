import {memo, useCallback, useEffect} from 'react';
import {useCurrentSubscription} from '^models/Subscription/hook';
import {useSyncHistoryList} from '^models/SubscriptionSyncHistory/hook';
import {subscriptionApi} from '^models/Subscription/api';

export const ConnectStatusPooling = memo(() => {
    const {currentSubscription, reload} = useCurrentSubscription();
    const {fetchItems: fetchSyncHistories, pagination} = useSyncHistoryList();

    const pool = useCallback((id: number, reloadable: boolean) => {
        subscriptionApi.show(id).then((res) => {
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
        if (!currentSubscription) return;
        pool(currentSubscription.id, false);
    }, [currentSubscription]);

    return <></>;
});
