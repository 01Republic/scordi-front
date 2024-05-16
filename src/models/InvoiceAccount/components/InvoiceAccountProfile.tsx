import React, {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {Avatar} from '^components/Avatar';
import {FaCircleExclamation} from 'react-icons/fa6';
import {InvoiceAccountProfileInManual} from '^models/InvoiceAccount/components/InvoiceAccountProfileInManual';

interface InvoiceAccountProfileProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountProfile = memo((props: InvoiceAccountProfileProps) => {
    const {invoiceAccount} = props;

    if (invoiceAccount.isManuallyCreated) {
        return <InvoiceAccountProfileInManual invoiceAccount={invoiceAccount} />;
    }

    return (
        <div data-id={invoiceAccount.id} className="!w-auto gap-4 flex items-center">
            <Avatar src={invoiceAccount.image || ''} className="w-8 h-8 outline outline-offset-1 outline-slate-100" />
            <div className="flex-1">
                {invoiceAccount.googleTokenData ? (
                    <p className="leading-none font-medium text-14 mb-1">{invoiceAccount.googleTokenData.name}</p>
                ) : (
                    <p className="leading-none text-orange-400 text-12 mb-1 flex items-center">
                        <FaCircleExclamation className="mr-1" />
                        <span>재연동이 필요합니다</span>
                    </p>
                )}
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
InvoiceAccountProfile.displayName = 'InvoiceAccountProfile';
