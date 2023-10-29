import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import React, {memo} from 'react';
import {BillingHistoryDto} from '^types/billing.type';
import {SubscriptionDto} from '^types/subscription.type';
import {connectCreditCardModal} from '^v3/share/modals/ConnectCreditCardModal/atom';
import {useModal} from '^v3/share/modals/useModal';
import {toast} from 'react-toastify';

interface ListItemForPaymentMethodProps {
    subscription?: SubscriptionDto | null;
    lastPaidHistory?: BillingHistoryDto | null;
}
export const ListItemForPaymentMethod = memo((props: ListItemForPaymentMethodProps) => {
    const {subscription, lastPaidHistory} = props;
    if (!subscription && !lastPaidHistory) return <></>;

    const {open} = useModal(connectCreditCardModal);
    const value = subscription?.creditCard?.label || lastPaidHistory?.paymentMethod || '';
    const onClick = () => {
        if (lastPaidHistory?.paymentMethod.includes('계좌')) {
            toast.info('계좌 등록 기능은 준비 중입니다.');
            return;
        }
        open();
    };

    return (
        <>
            <MobileInfoListItem label="결제수단">
                <div className="grid grid-cols-3 gap-1">
                    <button className="col-span-1 btn btn-xs btn-scordi opacity-75" onClick={onClick}>
                        변경하기
                    </button>
                    <span className="col-span-2">{value}</span>
                </div>
            </MobileInfoListItem>
        </>
    );
});
