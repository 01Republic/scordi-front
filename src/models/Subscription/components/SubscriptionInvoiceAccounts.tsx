import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components';

interface SubscriptionInvoiceAccountsProps {
    subscription: SubscriptionDto;
}

/**
 * 구독에 연결된 청구서수신계정
 * @required relations 'invoiceAccounts'
 */
export const SubscriptionInvoiceAccounts = memo((props: SubscriptionInvoiceAccountsProps) => {
    const {subscription} = props;
    const {invoiceAccounts = []} = subscription;

    const invoiceAccount: InvoiceAccountDto | undefined = invoiceAccounts[0];

    if (!invoiceAccount) return <div className="text-13 text-gray-300">비어있음</div>;

    const etc = invoiceAccounts.length - 1;

    return (
        <div>
            <div className="flex items-center gap-2 text-sm">
                {/*<InvoiceAccountProfile invoiceAccount={invoiceAccount} />*/}
                <span>{invoiceAccount.email}</span>
                <span>{etc ? ` 외 ${etc.toLocaleString()}개` : ''}</span>
            </div>
        </div>
    );
});
SubscriptionInvoiceAccounts.displayName = 'SubscriptionInvoiceAccounts';
