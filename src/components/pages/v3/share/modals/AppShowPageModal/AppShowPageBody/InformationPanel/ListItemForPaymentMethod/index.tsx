import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {CreditCardProfileOption2} from '^models/CreditCard/components';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {connectCreditCardModal} from '^v3/share/modals/AppShowPageModal/RegisterCreditCardModal/atom';
import {useModal} from '^v3/share/modals/useModal';

interface ListItemForPaymentMethodProps {
    subscription?: SubscriptionDto | null;
}

export const ListItemForPaymentMethod = memo((props: ListItemForPaymentMethodProps) => {
    const {subscription} = props;
    const {open: connectCreditCardModalOpen} = useModal(connectCreditCardModal);
    const creditCard = subscription?.creditCard;

    const onClick = () => {
        // if (lastPaidHistory?.paymentMethod?.includes('계좌')) {
        //     toast.info('계좌 등록 기능은 준비 중입니다.');
        //     return;
        // }
        connectCreditCardModalOpen();
    };

    if (!subscription) return <></>;

    return (
        <MobileInfoListItem label="결제수단" onClick={onClick}>
            {creditCard ? (
                <div>
                    <CreditCardProfileOption2 item={creditCard} />
                </div>
            ) : (
                <span className="text-sm text-gray-500">결제 수단을 등록해보세요</span>
            )}
        </MobileInfoListItem>
    );
});
