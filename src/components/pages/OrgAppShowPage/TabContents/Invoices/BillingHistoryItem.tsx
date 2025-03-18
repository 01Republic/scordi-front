import {memo} from 'react';
import {yyyy_mm_dd} from '^utils/dateTime';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {Check, Download, X} from 'lucide-react';

interface BillingHistoryItemProps {
    billingHistory: BillingHistoryDto;
}

export const BillingHistoryItem = memo((props: BillingHistoryItemProps) => {
    const {billingHistory} = props;

    const failedBgColorClass = 'bg-red-50';

    return (
        <tr id={`billing-history--${billingHistory.id}`} className={`${!billingHistory.paidAt && 'text-red-600'}`}>
            <td className={`${!billingHistory.paidAt && failedBgColorClass}`}>
                {billingHistory.paidAt ? <Check className="text-green-600" /> : <X />}
            </td>
            <td className={`${!billingHistory.paidAt && failedBgColorClass}`}>{billingHistory.uid}</td>
            <td className={`${!billingHistory.paidAt && failedBgColorClass}`}>
                {yyyy_mm_dd(new Date(billingHistory.issuedAt))}
            </td>
            <td className={`${!billingHistory.paidAt && failedBgColorClass}`}>{billingHistory.paymentMethod}</td>
            <td className={`${!billingHistory.paidAt && failedBgColorClass}`}>
                {billingHistory.payAmount ? `${billingHistory.payAmount?.amount.toFixed(2)}` : '-'}
            </td>
            <td className={`${!billingHistory.paidAt && failedBgColorClass}`}>
                {billingHistory.invoiceUrl && (
                    <Download
                        strokeWidth={3}
                        className="text-scordi-600 hover:text-scordi-900 cursor-pointer"
                        onClick={() => window.open(billingHistory.invoiceUrl!, '_blank')}
                    />
                )}
            </td>
        </tr>
    );
});
