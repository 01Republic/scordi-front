import React, {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {Avatar} from '^components/Avatar';

interface InvoiceAccountProfileProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountProfile = memo((props: InvoiceAccountProfileProps) => {
    const {invoiceAccount} = props;

    return (
        <div className="!w-auto gap-4 flex">
            <Avatar
                src={invoiceAccount.image || ''}
                className="w-9 h-9 outline outline-offset-1 outline-slate-100 mt-1"
            />
            {invoiceAccount.googleTokenData ? (
                <div className="flex-1">
                    <p>{invoiceAccount.googleTokenData?.name}</p>
                    <p className="text-sm font-extralight">{invoiceAccount.email}</p>
                </div>
            ) : (
                <div className="flex-1">
                    <p>{invoiceAccount.email}</p>
                </div>
            )}
        </div>
    );
});
InvoiceAccountProfile.displayName = 'InvoiceAccountProfile';
