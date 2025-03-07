import React, {memo} from 'react';
import {ListPageDropdown, ListPageDropdownMenu} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {SubscriptionDto} from '^models/Subscription/types';
import {SycnCreditCardButton} from './PaymentSync/SycnCreditCardButton';
import {SyncInvoiceAccountButton} from './PaymentSync/SyncInvoiceAccountButton';
import {RotateCw} from 'lucide-react';

interface AddPaymentHistoryDropdownProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const AddPaymentHistoryDropdown = memo((props: AddPaymentHistoryDropdownProps) => {
    const {subscription, reload} = props;

    return (
        <ListPageDropdown>
            <button className={`btn btn-sm btn-white gap-2 `}>
                <RotateCw fontSize={14} />
                <span>최신내역 불러오기</span>
            </button>

            <ListPageDropdownMenu>
                <SycnCreditCardButton subscription={subscription} reload={reload} />
                <SyncInvoiceAccountButton subscription={subscription} reload={reload} />
            </ListPageDropdownMenu>
        </ListPageDropdown>
    );
});
