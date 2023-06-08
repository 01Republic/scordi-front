import React, {memo} from 'react';
import {InvoiceAccountDto} from '^types/invoiceAccount.type';
import {Avatar} from '^components/Avatar';
import {BiChevronRight} from '@react-icons/all-files/bi/BiChevronRight';
import {useSetRecoilState} from 'recoil';
import {selectedInvoiceAccountAtom} from '../InvoiceAppListPanel';

interface InvoiceAccountItemProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountItem = memo((props: InvoiceAccountItemProps) => {
    const setSelectedInvoiceAccount = useSetRecoilState(selectedInvoiceAccountAtom);
    const {invoiceAccount} = props;
    const appNames = invoiceAccount.invoiceApps.map((app) => app.name);

    return (
        <li>
            <div
                className="flex items-center gap-4 px-6 bg-base-100 active:bg-scordi-light-100 text-gray-700 hover:text-scordi border-1 border-b border-b-gray-200"
                onClick={() => setSelectedInvoiceAccount(invoiceAccount)}
            >
                <Avatar src={invoiceAccount.image} className="w-7" />
                <div className="flex-1">
                    <p className="text-sm">{invoiceAccount.email}</p>
                    <p className="text-xs font-extralight">{appNames.join(', ')}</p>
                </div>
                <div>
                    <BiChevronRight size={22.5} />
                </div>
            </div>
        </li>
    );
});