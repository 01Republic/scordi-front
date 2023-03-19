import {memo} from 'react';
import {BillingHistoryDto} from '^types/billing.type';
import {IoClose} from 'react-icons/io5';
import {FiDownload, IoMdCheckmark} from '^components/react-icons';
import {yyyy_mm_dd} from '^utils/dateTime';

interface BillingHistoryItemProps {
    billingHistory: BillingHistoryDto;
}

export const BillingHistoryItem = memo((props: BillingHistoryItemProps) => {
    const {billingHistory} = props;

    const failedBgColorClass = 'bg-red-50';

    return (
        <tr id={`billing-history--${billingHistory.id}`} className={`${!billingHistory.isSuccess && 'text-red-600'}`}>
            <td className={`${!billingHistory.isSuccess && failedBgColorClass}`}>
                {billingHistory.isSuccess ? <IoMdCheckmark className="text-green-600" /> : <IoClose />}
            </td>
            <td className={`${!billingHistory.isSuccess && failedBgColorClass}`}>{billingHistory.uid}</td>
            <td className={`${!billingHistory.isSuccess && failedBgColorClass}`}>
                {yyyy_mm_dd(new Date(billingHistory.issuedAt))}
            </td>
            <td className={`${!billingHistory.isSuccess && failedBgColorClass}`}>{billingHistory.paymentMethod}</td>
            <td className={`${!billingHistory.isSuccess && failedBgColorClass}`}>
                ${billingHistory.paidAmount.toFixed(2)}
            </td>
            <td className={`${!billingHistory.isSuccess && failedBgColorClass}`}>
                {billingHistory.invoiceUrl && (
                    <FiDownload
                        strokeWidth={3}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                        onClick={() => window.open(billingHistory.invoiceUrl!, '_blank')}
                    />
                )}
            </td>
        </tr>
    );
});
