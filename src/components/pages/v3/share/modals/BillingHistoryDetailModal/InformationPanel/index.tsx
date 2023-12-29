import {BillingHistoryDto} from '^models/BillingHistory/type';
import {memo} from 'react';
import {EmailInvoiceBillingHistory} from '^v3/share/modals/BillingHistoryDetailModal/InformationPanel/EmailInvoiceBillingHistory';
import {CardReceiptBillingHistory} from '^v3/share/modals/BillingHistoryDetailModal/InformationPanel/CardReceiptBillingHistory';

interface BillingHistoryInformationPanelProps {
    billingHistory: BillingHistoryDto;
}
export const BillingHistoryInformationPanel = memo(function BillingHistoryInformationPanel(
    props: BillingHistoryInformationPanelProps,
) {
    const {billingHistory} = props;
    switch (billingHistory.subtype) {
        case 'EMAIL_INVOICE':
            return <EmailInvoiceBillingHistory billingHistory={billingHistory} />;
        case 'CARD_RECEIPT':
            return <CardReceiptBillingHistory billingHistory={billingHistory} />;
        default:
            return <></>;
    }
});
