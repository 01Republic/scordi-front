import React, {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {Avatar} from '^components/Avatar';

interface InvoiceAccountProviderAvatarProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountProviderAvatar = memo((props: InvoiceAccountProviderAvatarProps) => {
    const {invoiceAccount} = props;

    if (invoiceAccount.googleTokenDataId) {
        return (
            <Avatar
                // src="https://www.google.com/a/cpanel/01republic.io/images/favicon.ico"
                src="https://www.google.com/favicon.ico"
                className="w-[20px] p-[1px] bg-white rounded-full outline outline-2 outline-slate-300"
                draggable={false}
            />
        );
    }

    return <></>;
});
InvoiceAccountProviderAvatar.displayName = 'InvoiceAccountProviderAvatar';
