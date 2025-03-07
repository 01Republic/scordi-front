import React, {memo, useCallback} from 'react';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {InvoiceAppItem} from './InvoiceAppItem';
import {RemoveAccountItem} from '^v3/V3OrgHomePage/InvoiceAccountAddingButton/InvoiceAppListPanel/RemoveAccountItem';
import {currentOrgAtom} from '^models/Organization/atom';
import {invoiceAccountsAtom} from '^v3/V3OrgHomePage/InvoiceAccountAddingButton/InvoiceAccountListPanel';
import {useTranslation} from 'next-i18next';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {ChevronsLeft} from 'lucide-react';

export const selectedInvoiceAccountAtom = atom<InvoiceAccountDto | null>({
    key: 'InvoiceAccountListPanel--selectedInvoiceAccountAtom',
    default: null,
});

export const InvoiceAppListPanel = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const setInvoiceAccounts = useSetRecoilState(invoiceAccountsAtom);
    const [selectedInvoiceAccount, setSelectedInvoiceAccount] = useRecoilState(selectedInvoiceAccountAtom);
    const {t} = useTranslation('org-home');

    const invoiceApps = selectedInvoiceAccount?.invoiceApps || [];

    const onRemove = useCallback(
        (invoiceAccount: InvoiceAccountDto) => {
            if (!currentOrg) return;

            invoiceAccountApi.destroy(currentOrg.id, invoiceAccount.id).then(() => {
                setSelectedInvoiceAccount(null);
                setInvoiceAccounts((accounts) => {
                    const remainAccounts = accounts.filter((account) => {
                        return account.id !== invoiceAccount.id;
                    });
                    return [...remainAccounts];
                });
            });
        },
        [currentOrg],
    );

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
                                <ChevronsLeft />
                                <span>{t('invoiceAccountAddingPanel.account')}</span>
                            </div>
                            <div className="text-xs font-extralight">{selectedInvoiceAccount.email}</div>
                        </div>
                    </li>
                    {invoiceApps.map((invoiceApp, i) => (
                        <InvoiceAppItem key={i} invoiceApp={invoiceApp} />
                    ))}
                    <RemoveAccountItem onClick={onRemove} />
                </>
            )}
        </ul>
    );
});
