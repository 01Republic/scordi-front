import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import React, {memo} from 'react';
import {InvoiceAccountItem} from './InvoiceAccountItem';
import {AddNewAccountItem} from './AddNewAccountItem';
import {selectedInvoiceAccountAtom} from '^v3/V3OrgHomePage/InvoiceAccountAddingButton/InvoiceAppListPanel';

export const invoiceAccountsAtom = atom<InvoiceAccountDto[]>({
    key: 'InvoiceAccountListPanel--invoiceAccountsAtom',
    default: [],
});

export const InvoiceAccountListPanel = memo(() => {
    const [invoiceAccounts, setInvoiceAccounts] = useRecoilState(invoiceAccountsAtom);
    const selectedInvoiceAccount = useRecoilValue(selectedInvoiceAccountAtom);

    return (
        <ul
            tabIndex={0}
            className={`dropdown-content menu py-0 mt-2 shadow-xl bg-base-100 rounded-box w-80 ${
                !selectedInvoiceAccount ? 'active' : ''
            }`}
            onBlur={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            {invoiceAccounts.map((invoiceAccount, i) => (
                <InvoiceAccountItem key={i} invoiceAccount={invoiceAccount} />
            ))}
            <AddNewAccountItem />
        </ul>
    );
});
