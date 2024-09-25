import {memo} from 'react';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {UpdateBillingHistoryRequestDtoV2} from '^models/BillingHistory/type/update-billing-history.request.dto.v2';
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
        // return <EmailInvoiceBillingHistoryEditPanel />;
        case 'CARD_RECEIPT':
        // return <CardReceiptBillingHistoryEditPanel />;
        default:
            return <></>;
    }
});
