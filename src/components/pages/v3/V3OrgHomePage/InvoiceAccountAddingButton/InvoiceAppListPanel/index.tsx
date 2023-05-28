import React, {memo} from 'react';
import {atom, useRecoilState} from 'recoil';
import {BiChevronsLeft} from '@react-icons/all-files/bi/BiChevronsLeft';
import {InvoiceAccountDto} from '^types/invoiceAccount.type';
import {InvoiceAppItem} from './InvoiceAppItem';

export const selectedInvoiceAccountAtom = atom<InvoiceAccountDto | null>({
    key: 'InvoiceAccountListPanel--selectedInvoiceAccountAtom',
    default: null,
});

export const InvoiceAppListPanel = memo(() => {
    const [selectedInvoiceAccount, setSelectedInvoiceAccount] = useRecoilState(selectedInvoiceAccountAtom);

    const invoiceApps = selectedInvoiceAccount?.invoiceApps || [];

    return (
        <ul
            tabIndex={0}
            className={`dropdown-content menu py-0 mt-2 shadow-xl bg-base-100 rounded-box w-80 ${
                selectedInvoiceAccount ? 'active' : ''
            }`}
            onBlur={(e) => {
                if (e.relatedTarget) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }}
        >
            {selectedInvoiceAccount && (
                <>
                    <li>
                        <div className="items-center justify-between bg-base-100 text-gray-500 cursor-default border-1 border-b border-b-gray-200">
                            <div
                                className="flex items-center gap-0.5 cursor-pointer text-sm"
                                onClick={() => setSelectedInvoiceAccount(null)}
                            >
                                <BiChevronsLeft />
                                <span>계정</span>
                            </div>
                            <div className="text-xs font-extralight">{selectedInvoiceAccount.email}</div>
                        </div>
                    </li>
                    {invoiceApps.map((invoiceApp, i) => (
                        <InvoiceAppItem key={i} invoiceApp={invoiceApp} />
                    ))}
                    {/*<AddNewAccountItem onClick={createAccount} />*/}
                </>
            )}
        </ul>
    );
});
