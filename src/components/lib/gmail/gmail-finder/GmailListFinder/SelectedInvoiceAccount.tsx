import React, {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {X} from 'lucide-react';

interface SelectedInvoiceAccountProps {
    invoiceAccount?: InvoiceAccountDto;
    onClick: () => any;
}

export const SelectedInvoiceAccount = memo((props: SelectedInvoiceAccountProps) => {
    const {invoiceAccount, onClick} = props;

    return (
        <section className="flex items-center text-12 gap-4 mb-4">
            {/* Filter: InvoiceAccount */}
            {invoiceAccount ? (
                <div className="flex items-center">
                    <div className="mr-2">선택된 계정:</div>
                    <div className="flex items-center group cursor-pointer" onClick={() => onClick()}>
                        <div className="text-gray-400 group-hover:text-gray-800 transition-all">
                            {invoiceAccount.email}
                        </div>
                        <X size={20} className="text-gray-400 group-hover:text-gray-800 transition-all" />
                    </div>
                </div>
            ) : (
                <div className="flex items-center">
                    <div className="flex items-center group">
                        <div className="text-gray-400 group-hover:text-gray-800 transition-all">
                            선택된 계정이 없습니다.
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
});
SelectedInvoiceAccount.displayName = 'SelectedInvoiceAccount';
