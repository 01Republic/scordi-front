import React, {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {Check} from 'lucide-react';

interface InvoiceAccountSelectItemProps {
    invoiceAccount: InvoiceAccountDto;
    onClick?: (selected: InvoiceAccountDto) => any;
    isSelected?: boolean;
}

export const InvoiceAccountSelectItem = memo((props: InvoiceAccountSelectItemProps) => {
    const {invoiceAccount, onClick, isSelected = false} = props;

    return (
        <div
            onClick={() => onClick && onClick(invoiceAccount)}
            className="flex items-center justify-between px-4 py-3 -mx-4 no-selectable hover:bg-scordi-light-50 rounded-btn cursor-pointer group"
        >
            <InvoiceAccountProfile invoiceAccount={invoiceAccount} />

            <div className="flex items-center">
                <button className="relative">
                    <Check
                        strokeWidth={3}
                        className={`text-20 ${
                            isSelected ? `text-indigo-500` : 'text-transparent group-hover:text-indigo-200'
                        }`}
                    />
                </button>
            </div>
        </div>
    );
});
InvoiceAccountSelectItem.displayName = 'SubscriptionSelectItem';
