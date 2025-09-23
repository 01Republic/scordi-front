import React, {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {Avatar} from '^components/Avatar';
import {AlertCircle} from 'lucide-react';

interface InvoiceAccountProfileInManualProps {
    invoiceAccount: InvoiceAccountDto;
    ellipsis?: boolean;
}

export const InvoiceAccountProfileInManual = memo((props: InvoiceAccountProfileInManualProps) => {
    const {invoiceAccount} = props;

    return (
        <div data-id={invoiceAccount.id} className="!w-auto gap-4 flex items-center">
            <Avatar src={invoiceAccount.image || ''} className="w-8 h-8 outline outline-offset-1 outline-slate-100" />
            <div className="flex-1">
                <p
                    className={`leading-none ${
                        invoiceAccount.googleTokenDataId ? 'text-gray-400 text-12' : 'font-medium text-14'
                    }`}
                >
                    {invoiceAccount.email}
                </p>
            </div>
        </div>
    );
});
InvoiceAccountProfileInManual.displayName = 'InvoiceAccountProfileInManual';

export const InvoiceAccountProfileCompactInManual = memo((props: InvoiceAccountProfileInManualProps) => {
    const {invoiceAccount, ellipsis = false} = props;

    return (
        <div data-id={invoiceAccount.id} className="!w-auto gap-2 flex items-center">
            <Avatar
                src={invoiceAccount.image || ''}
                className="w-[20px] h-[20px] outline outline-offset-1 outline-slate-100"
            />
            <div className={`flex-1 ${ellipsis ? 'overflow-hidden' : ''}`}>
                <p className={`leading-none ${ellipsis ? 'overflow-hidden text-ellipsis' : ''}`}>
                    {invoiceAccount.email}
                </p>
            </div>
        </div>
    );
});
InvoiceAccountProfileCompactInManual.displayName = 'InvoiceAccountProfileCompactInManual';
