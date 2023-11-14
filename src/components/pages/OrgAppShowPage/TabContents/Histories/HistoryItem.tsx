import {memo} from 'react';
import {IoMdClose, IoMdRefresh} from '^components/react-icons';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {HistoryStatusButton} from './HistoryStatusButton';
import {
    SyncHistoryDto,
    SyncHistoryResultStatus,
} from '^models/SubscriptionSyncHistory/type/subscriptionSyncHistory.type';
import {getDistanceOfTime, humanizeTimeDistance} from '^utils/dateTime';
import {zeroPad} from '^utils/number';
import {useCurrentSyncHistory} from '^models/SubscriptionSyncHistory/hook';
import {syncHistory} from '^models/SubscriptionSyncHistory/api';

interface HistoryItemProps {
    subscription: SubscriptionDto;
    history: SyncHistoryDto;
    onRefresh: (history: SyncHistoryDto) => any;
}

export const HistoryItem = memo((props: HistoryItemProps) => {
    const {subscription, history, onRefresh} = props;
    const {currentSyncHistory, fetchCurrentSyncHistory} = useCurrentSyncHistory();

    const {product} = subscription;

    const durationMsg = (() => {
        if (history.finishedAt === null) return 'Running ...';

        const distance = getDistanceOfTime(new Date(history.createdAt), new Date(history.finishedAt));
        return [distance.hour, distance.minute, distance.second].map((n) => zeroPad(n.toString())).join(':');
    })();

    const finishedAgoMsg = (() => {
        if (history.finishedAt === null) return '-';

        const distance = getDistanceOfTime(new Date(history.finishedAt), new Date());
        const distanceText = humanizeTimeDistance(distance, {
            shorten: true,
            text: {minute: 'mins', second: 'sec'},
        });
        return distanceText ? `${distanceText} ago` : 'just now';
    })();

    const onRefreshClick = () => {
        onRefresh(history);
        if (currentSyncHistory && history.id === currentSyncHistory.id) {
            fetchCurrentSyncHistory(subscription.id);
        }
    };

    const onCancel = () => {
        syncHistory
            .update(subscription.id, history.id, {
                resultStatus: SyncHistoryResultStatus.CANCELED,
                finishedAt: new Date(),
            })
            .then(() => onRefreshClick());
    };

    return (
        <tr className="text-sm">
            {/*Status*/}
            <td>
                <HistoryStatusButton status={history.resultStatus} />
            </td>

            {/*Sync ID*/}
            <td className="font-semibold">#{history.id}</td>

            {/*Name*/}
            <td>{history.content}</td>

            {/*Duration*/}
            <td>{durationMsg}</td>

            {/*Finished at*/}
            <td>
                {history.resultStatus === SyncHistoryResultStatus.IN_PROGRESS ? (
                    <button
                        className="btn btn-sm btn-red-500 btn-outline normal-case gap-1 items-center"
                        onClick={onCancel}
                    >
                        <IoMdClose size={16} strokeWidth={20} className="-ml-1.5" />
                        <span>Cancel</span>
                    </button>
                ) : (
                    <>{finishedAgoMsg}</>
                )}
            </td>

            {/*Actions*/}
            <td>
                <button className="btn btn-sm btn-circle btn-ghost" onClick={onRefreshClick}>
                    <IoMdRefresh size={20} />
                </button>
            </td>
        </tr>
    );
});
