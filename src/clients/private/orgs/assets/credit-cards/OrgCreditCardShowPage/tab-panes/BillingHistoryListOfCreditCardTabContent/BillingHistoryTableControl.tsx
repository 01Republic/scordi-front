import React, {memo} from 'react';
import {MdRefresh} from 'react-icons/md';
import {useCurrentCreditCardSync} from '../../atom';
import {BillingHistoryScopeHandler} from './BillingHistoryScopeHandler';

export const BillingHistoryTableControl = memo(() => {
    return (
        <div className="flex items-center justify-between mb-4">
            <BillingHistoryScopeHandler />

            <div>
                <div className="flex items-center gap-2">
                    <SyncRecentBillingHistoryButton />
                </div>
            </div>
        </div>
    );
});

export const SyncRecentBillingHistoryButton = memo(() => {
    const {startSync, isSyncRunning} = useCurrentCreditCardSync();

    return (
        <button
            className={`btn btn-sm bg-white border-gray-300 hover:bg-white hover:border-gray-300 gap-2 ${
                isSyncRunning ? 'btn-disabled' : ''
            }`}
            onClick={startSync}
        >
            <MdRefresh fontSize={14} className={isSyncRunning ? 'animate-spin' : ''} />
            <span>최신내역 불러오기</span>
        </button>
    );
});