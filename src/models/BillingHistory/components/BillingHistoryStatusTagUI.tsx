import {memo} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor} from '^components/util/palette';

interface BillingHistoryStatusTagUIProps {
    billingHistory: BillingHistoryDto;
}

export const BillingHistoryStatusTagUI = memo((props: BillingHistoryStatusTagUIProps) => {
    const {billingHistory} = props;

    if (billingHistory.paidAt) return <TagUI className={`bg-green-200`}>결제됨</TagUI>;
    // return <TagUI className={`bg-red-200`}>실패</TagUI>;
    return <TagUI className={`bg-gray-200`}>예정</TagUI>;
});
BillingHistoryStatusTagUI.displayName = 'BillingHistoryStatusTagUI';
