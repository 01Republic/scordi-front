import {memo} from 'react';
import {
    syncHistoryAssets,
    SyncHistoryResultStatus,
    t_syncHistoryResultStatus,
} from '^types/subscriptionSyncHistory.type';

interface StatusButtonProps {
    status: SyncHistoryResultStatus;
}

export const HistoryStatusButton = memo((props: StatusButtonProps) => {
    const {status} = props;
    const asset = syncHistoryAssets[status];
    const Icon = asset.Icon;
    const label = t_syncHistoryResultStatus(status);

    switch (status) {
        case SyncHistoryResultStatus.IN_PROGRESS:
            return (
                <button className={`btn2 btn-sm btn-${asset.darken} btn-outline loading`}>
                    <span>{label}</span>
                </button>
            );
        case SyncHistoryResultStatus.SUCCESS:
            return (
                <button className={`btn2 btn-sm gap-1.5 btn-${asset.normal}`}>
                    <Icon size={16} />
                    <span>{label}</span>
                </button>
            );
        case SyncHistoryResultStatus.FAILED:
            return (
                <button className={`btn2 btn-sm gap-1.5 btn-${asset.normal}`}>
                    <Icon size={16} />
                    <span>{label}</span>
                </button>
            );
        case SyncHistoryResultStatus.CANCELED:
            return (
                <button className={`btn2 btn-sm gap-1.5 btn-${asset.normal}`}>
                    <Icon size={16} />
                    <span>{label}</span>
                </button>
            );
        default:
            return <></>;
    }
});
