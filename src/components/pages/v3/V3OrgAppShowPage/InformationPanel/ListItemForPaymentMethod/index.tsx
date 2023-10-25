import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import React, {memo} from 'react';
import {BillingHistoryDto} from '^types/billing.type';
import {SubscriptionDto} from '^types/subscription.type';
import {addCreditCardModal} from '^v3/V3OrgAppShowPage/InformationPanel/ListItemForPaymentMethod/RegisterCreditCardModal/atom';
import {useModal} from '^v3/share/modals/useModal';

interface ListItemForPaymentMethodProps {
    lastPaidHistory?: BillingHistoryDto | null;
    subscription?: SubscriptionDto | null;
}
export const ListItemForPaymentMethod = memo((props: ListItemForPaymentMethodProps) => {
    const {lastPaidHistory, subscription} = props;
    if (!lastPaidHistory && !subscription) return <></>;

    const {open} = useModal(addCreditCardModal);
    const value = subscription?.creditCard?.card || lastPaidHistory?.paymentMethod || '';

    return <MobileInfoListItem label="결제수단" value={value} onClick={open} />;
});
