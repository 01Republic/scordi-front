import React, {memo} from 'react';
import {MdRefresh} from 'react-icons/md';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {useCurrentInvoiceAccount, useCurrentInvoiceAccountSync} from '../../atom';
import {startSyncWithCheckValidToken} from '../../InvoiceAccountActionPanel/ReconnectModal';
import {BillingHistoryTableTitle} from './BillingHistoryTableTitle';
import {BillingHistoryScopeHandler} from './BillingHistoryScopeHandler';

export const BillingHistoryTableControl = memo(() => {
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();
    return (
        <div className="">
            {currentInvoiceAccount && <BillingHistoryTableTitle invoiceAccount={currentInvoiceAccount} />}
            <div className="flex items-center justify-between mb-4">
                <BillingHistoryScopeHandler invoiceAccount={currentInvoiceAccount || undefined} />

                <div>
                    <div className="flex items-center gap-2">
                        {currentInvoiceAccount && (
                            <SyncRecentBillingHistoryButton invoiceAccount={currentInvoiceAccount} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

interface ButtonProps {
    invoiceAccount: InvoiceAccountDto;
}

export const SyncRecentBillingHistoryButton = memo((props: ButtonProps) => {
    const {invoiceAccount} = props;
    const {startSync, isSyncRunning} = useCurrentInvoiceAccountSync();

    const onClick = () => {
        startSyncWithCheckValidToken(invoiceAccount, () => startSync());
    };

    return (
        <button className={`btn btn-sm btn-white gap-2 ${isSyncRunning ? 'btn-disabled' : ''}`} onClick={onClick}>
            <MdRefresh fontSize={14} className={isSyncRunning ? 'animate-spin' : ''} />
            <span>최신내역 불러오기</span>
        </button>
    );
});
