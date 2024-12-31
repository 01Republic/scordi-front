import React, {memo} from 'react';
import {BillingHistoryDto, BillingHistoryStatus} from '^models/BillingHistory/type';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';

interface BillingHistoryPaidAtProps {
    billingHistory: BillingHistoryDto;
}

// 결제내역 - 일시 (paidAt or issuedAt)
export const BillingHistoryTimestamp = memo((props: BillingHistoryPaidAtProps) => {
    const {billingHistory} = props;
    const {about, paidAt, issuedAt} = billingHistory;
    const date = paidAt || issuedAt;

    switch (about) {
        case BillingHistoryStatus.PayFail:
            return <span className="text-red-400">{yyyy_mm_dd_hh_mm(date)}</span>;
        default:
            return <span>{yyyy_mm_dd_hh_mm(date)}</span>;
    }
});
BillingHistoryTimestamp.displayName = 'BillingHistoryPaidAt';
