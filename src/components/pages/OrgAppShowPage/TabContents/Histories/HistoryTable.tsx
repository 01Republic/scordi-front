import {memo, useCallback, useEffect} from 'react';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {HistoryItem} from '^components/pages/OrgAppShowPage/TabContents/Histories/HistoryItem';
import {SyncNowButton} from '^components/pages/OrgAppShowPage/TabContents/Histories/SyncNowButton';
import {useCurrentSyncHistory, useSyncHistoryList} from '^models/SubscriptionSyncHistory/hook';
import {Paginator} from '^components/Paginator';
import {SyncHistoryDto} from '^models/SubscriptionSyncHistory/type/subscriptionSyncHistory.type';
import {toast} from 'react-toastify';

interface HistoryTableProps {
    subscription: SubscriptionDto;
}

export const HistoryTable = memo((props: HistoryTableProps) => {
    const {subscription} = props;
    const {items: syncHistories, fetchItems: fetchSyncHistories, pagination} = useSyncHistoryList();
    const {currentSyncHistory} = useCurrentSyncHistory();

    useEffect(() => {
        if (!subscription) return;
        fetchSyncHistories(subscription.id, 1, true);
    }, [subscription]);

    const {product} = subscription;

    const onRefreshItem = useCallback(
        (history: SyncHistoryDto) => {
            const req = fetchSyncHistories(subscription.id, pagination.currentPage, true);
            req && req.then(() => toast.success('Refreshed'));
        },
        [subscription, pagination],
    );

    return (
        <div className="bs-container mb-10">
            <div className="bs-row items-center mb-4">
                {/* Left */}
                <div>
                    <h3 className="leading-none">Sync Histories</h3>
                </div>

                {/* Right */}
                <div className="ml-auto flex gap-2">
                    <SyncNowButton subscription={subscription} history={currentSyncHistory} />
                </div>
            </div>

            <div className="bs-row mb-4">
                <div className="bs-col-12 px-0">
                    <div className="card w-full bg-white shadow border">
                        <div className="card-body p-0 overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Sync ID</th>
                                        <th style={{width: '50%'}}>Message</th>
                                        <th>Duration</th>
                                        <th>Finished at</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {syncHistories.map((history, i) => (
                                        <HistoryItem
                                            key={i}
                                            subscription={subscription}
                                            history={history}
                                            onRefresh={onRefreshItem}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bs-row">
                <div className="bs-col-12 px-0">
                    <div className="flex justify-end gap-3">
                        <Paginator
                            className="border shadow rounded-lg"
                            currentPage={pagination.currentPage}
                            totalPage={pagination.totalPage}
                            onClick={(pageNum) => fetchSyncHistories(subscription.id, pageNum)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
