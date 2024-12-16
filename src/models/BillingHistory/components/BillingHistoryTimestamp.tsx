import React, {memo} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';

interface BillingHistoryPaidAtProps {
    billingHistory: BillingHistoryDto;
}

// 결제내역 - 일시 (paidAt or issuedAt)
export const BillingHistoryTimestamp = memo((props: BillingHistoryPaidAtProps) => {
    const {billingHistory} = props;
    const {paidAt, issuedAt} = billingHistory;

    return paidAt ? (
        <span>{yyyy_mm_dd_hh_mm(paidAt)}</span>
    ) : (
        <span className="text-red-400">{yyyy_mm_dd_hh_mm(issuedAt)}</span>
    );
});
BillingHistoryTimestamp.displayName = 'BillingHistoryPaidAt';
