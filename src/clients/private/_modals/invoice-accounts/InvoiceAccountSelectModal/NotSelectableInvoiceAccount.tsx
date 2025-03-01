import React, {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {enterToSpace} from '^components/util/keyDownLikeClick';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface NotSelectableInvoiceAccountProps {
    invoiceAccount: InvoiceAccountDto;
    onClick: () => any;
}

export const NotSelectableInvoiceAccount = memo((props: NotSelectableInvoiceAccountProps) => {
    const {invoiceAccount, onClick} = props;

    return (
        <div
            tabIndex={0}
            className="-mx-4 px-4 py-2.5 cursor-pointer group hover:bg-gray-100 flex items-center justify-between rounded-box btn-animation"
            onKeyDown={enterToSpace(onClick)}
            onClick={onClick}
        >
            <div>
                <InvoiceAccountProfile invoiceAccount={invoiceAccount} />
            </div>

            <div>
                <TagUI className="bg-orange-100 text-orange-500">재연동</TagUI>
            </div>
        </div>
    );
});
NotSelectableInvoiceAccount.displayName = 'NotSelectableInvoiceAccount';
