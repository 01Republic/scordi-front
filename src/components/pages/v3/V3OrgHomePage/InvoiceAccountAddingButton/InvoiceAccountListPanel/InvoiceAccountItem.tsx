import React, {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
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
    const appNames: string[] = [];

    const invoiceApps = invoiceAccount.invoiceApps || [];
    const len = invoiceApps.length;
    invoiceApps.forEach((app, i) => {
        if (!app.product) return;
        if (i < 2) {
            appNames.push(app.product.nameEn);
        }
        if (i === 2) appNames.push(`${app.product.nameEn} ... ${len} apps`);
        if (i > 2) return;
    });

    return (
        <li>
            <div
                className="flex items-center gap-4 px-6 bg-base-100 active:bg-scordi-light-100 text-gray-700 hover:text-scordi border-1 border-b border-b-gray-200"
                onClick={() => setSelectedInvoiceAccount(invoiceAccount)}
            >
                <Avatar src={invoiceAccount.image || ''} className="w-7" />
                <div className="flex-1">
                    <p className="text-sm mb-1">{invoiceAccount.email}</p>
                    <p className="text-xs font-extralight">{appNames.join(', ')}</p>
                </div>
                <div>
                    <BiChevronRight size={22.5} />
                </div>
            </div>
        </li>
    );
});
