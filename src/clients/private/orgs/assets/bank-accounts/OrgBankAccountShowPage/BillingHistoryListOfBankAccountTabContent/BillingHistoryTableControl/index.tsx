import React, {memo} from 'react';
import {useCurrentCreditCardSync} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/atom';
import {BillingHistoryScopeHandlerOfBankAccount} from './BillingHistoryScopeHandlerOfBankAccount';
import {RotateCw} from 'lucide-react';

export const BillingHistoryTableControl = memo(() => {
    return (
        <div className="flex items-center justify-between mb-4">
            <BillingHistoryScopeHandlerOfBankAccount />

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

    const onClick = () => {
        startSync();
    };

    return (
        <button className={`btn btn-sm btn-white gap-2 ${isSyncRunning ? 'btn-disabled' : ''}`} onClick={onClick}>
            <RotateCw fontSize={14} className={isSyncRunning ? 'animate-spin' : ''} />
            <span>최신내역 불러오기</span>
        </button>
    );
});
