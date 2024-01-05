import {memo} from 'react';

import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {CardReceiptBillingHistoryInfoPanel, EmailInvoiceBillingHistoryInfoPanel} from './InformationPanelBySubtype';

export const BillingHistoryInformationPanel = memo(function BillingHistoryInformationPanel() {
    const {billingHistory} = useBillingHistoryInModal();
    if (!billingHistory) return <></>;

    switch (billingHistory.subtype) {
        case 'EMAIL_INVOICE':
            return <EmailInvoiceBillingHistoryInfoPanel billingHistory={billingHistory} />;
        case 'CARD_RECEIPT':
            return <CardReceiptBillingHistoryInfoPanel billingHistory={billingHistory} />;
        default:
            return <></>;
    }
});
