import {ListPageDropdown, ListPageDropdownMenu} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {SubscriptionDto} from '^models/Subscription/types';
import {RotateCw} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {SycnCreditCardButton} from './PaymentSync/SycnCreditCardButton';
import {SyncInvoiceAccountButton} from './PaymentSync/SyncInvoiceAccountButton';

interface AddPaymentHistoryDropdownProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const AddPaymentHistoryDropdown = memo((props: AddPaymentHistoryDropdownProps) => {
    const {subscription, reload} = props;
    const {t} = useTranslation('subscription');

    return (
        <ListPageDropdown>
            <button className={`btn btn-sm btn-white gap-2 `}>
                <RotateCw fontSize={14} />
                <span>{t('paymentSync.loadLatest')}</span>
            </button>

            <ListPageDropdownMenu>
                <SycnCreditCardButton subscription={subscription} reload={reload} />
                <SyncInvoiceAccountButton subscription={subscription} reload={reload} />
            </ListPageDropdownMenu>
        </ListPageDropdown>
    );
});
