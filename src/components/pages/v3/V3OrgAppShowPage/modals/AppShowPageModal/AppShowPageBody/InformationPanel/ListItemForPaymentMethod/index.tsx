import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import React, {memo} from 'react';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {connectCreditCardModal} from '^v3/share/modals/ConnectCreditCardModal/atom';
import {useModal} from '^v3/share/modals/useModal';
import {toast} from 'react-toastify';
import {FiChevronRight} from '^components/react-icons';
import {BillingHistoryDto} from '^models/BillingHistory/type';

interface ListItemForPaymentMethodProps {
    subscription?: SubscriptionDto | null;
    lastPaidHistory?: BillingHistoryDto | null;
}
export const ListItemForPaymentMethod = memo((props: ListItemForPaymentMethodProps) => {
    const {subscription, lastPaidHistory} = props;
    if (!subscription && !lastPaidHistory) return <></>;

    const {open: connectCreditCardModalOpen} = useModal(connectCreditCardModal);
    const value = subscription?.creditCard?.label || lastPaidHistory?.paymentMethod;
    const onClick = () => {
        if (lastPaidHistory?.paymentMethod?.includes('계좌')) {
            toast.info('계좌 등록 기능은 준비 중입니다.');
            return;
        }
        connectCreditCardModalOpen();
    };

    return (
        <MobileInfoListItem label="결제수단" onClick={onClick}>
            {value ? (
                <span className="col-span-2">{value}</span>
            ) : (
                <span className="text-sm text-gray-500">결제 수단을 등록해보세요</span>
            )}
        </MobileInfoListItem>
    );
});
