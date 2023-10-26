import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import React, {memo} from 'react';
import {BillingHistoryDto} from '^types/billing.type';
import {SubscriptionDto} from '^types/subscription.type';
import {addCreditCardModal} from '^v3/share/modals/RegisterCreditCardModal/atom';
import {useModal} from '^v3/share/modals/useModal';

interface ListItemForPaymentMethodProps {
    subscription?: SubscriptionDto | null;
    lastPaidHistory?: BillingHistoryDto | null;
}
export const ListItemForPaymentMethod = memo((props: ListItemForPaymentMethodProps) => {
    const {subscription, lastPaidHistory} = props;
    if (!subscription && !lastPaidHistory) return <></>;

    const {open} = useModal(addCreditCardModal);
    const value = subscription?.creditCard?.label || lastPaidHistory?.paymentMethod || '';

    return <MobileInfoListItem label="결제수단" value={value} onClick={open} />;
});
