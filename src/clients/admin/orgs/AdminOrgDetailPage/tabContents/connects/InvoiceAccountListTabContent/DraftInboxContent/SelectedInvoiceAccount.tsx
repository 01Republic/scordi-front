import React, {memo} from 'react';
import {IoIosClose} from 'react-icons/io';
import {useRecoilState} from 'recoil';
import {selectedInvoiceAccountAtom} from '../atoms';

interface SelectedInvoiceAccountProps {
    onClick: () => any;
}

export const SelectedInvoiceAccount = memo((props: SelectedInvoiceAccountProps) => {
    const {onClick} = props;
    const [selectedInvoiceAccount, setSelectedInvoiceAccount] = useRecoilState(selectedInvoiceAccountAtom);

    if (!selectedInvoiceAccount) return <></>;

    return (
        <section className="flex items-center text-12 gap-4 mb-4">
            {/* Filter: InvoiceAccount */}
            <div className="flex items-center">
                <div className="mr-2">선택된 계정:</div>
                <div
                    className="flex items-center group cursor-pointer"
                    onClick={() => {
                        setSelectedInvoiceAccount(undefined);
                        onClick();
                    }}
                >
                    <div className="text-gray-400 group-hover:text-gray-800 transition-all">
                        {selectedInvoiceAccount.email}
                    </div>
                    <IoIosClose size={20} className="text-gray-400 group-hover:text-gray-800 transition-all" />
                </div>
            </div>
        </section>
    );
});
SelectedInvoiceAccount.displayName = 'SelectedInvoiceAccount';
