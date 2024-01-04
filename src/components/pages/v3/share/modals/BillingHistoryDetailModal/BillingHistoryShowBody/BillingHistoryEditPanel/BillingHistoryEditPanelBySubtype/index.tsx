import {CardReceiptBillingHistoryEditPanel} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryShowBody/BillingHistoryEditPanel/BillingHistoryEditPanelBySubtype/CardReceiptBillingHistoryEditPanel';
import {memo} from 'react';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {EmailInvoiceBillingHistoryEditPanel} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryShowBody/BillingHistoryEditPanel/BillingHistoryEditPanelBySubtype/EmailInvoiceBillingHistoryEditPanel';
import {UpdateBillingHistoryRequestDtoV2} from '^models/BillingHistory/type';
import {UseFormReturn} from 'react-hook-form';

interface BillingHistoryEditPanelBySubtypeProps {
    form?: UseFormReturn<UpdateBillingHistoryRequestDtoV2>;
}
export const BillingHistoryEditPanelBySubtype = memo(function BillingHistoryEditPanelBySubtype(
    props: BillingHistoryEditPanelBySubtypeProps,
) {
    const {billingHistory} = useBillingHistoryInModal();
    const {form} = props;
    if (!billingHistory) return <></>;
    switch (billingHistory.subtype) {
        case 'EMAIL_INVOICE':
            return <EmailInvoiceBillingHistoryEditPanel />;
        case 'CARD_RECEIPT':
            return <CardReceiptBillingHistoryEditPanel />;
        default:
            return <></>;
    }
});
