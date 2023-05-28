import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {InvoiceAccountDto} from '^types/invoiceAccount.type';
import {InvoiceAccountListPanel, invoiceAccountsAtom} from './InvoiceAccountListPanel';
import {isOpenNewInvoiceAccountModalAtom} from '../NewInvoiceAccountModal';
import {InvoiceAppListPanel, selectedInvoiceAccountAtom} from './InvoiceAppListPanel';
import {currentOrgAtom} from '^atoms/organizations.atom';

const dataList: InvoiceAccountDto[] = [
    {
        image: '',
        email: 'fred@01republic.io',
        invoiceApps: [
            {image: '', name: 'Github', isActive: true},
            {image: '', name: 'AWS', isActive: true},
        ],
    },
    {
        image: '',
        email: 'scott@01republic.io',
        invoiceApps: [
            {image: '', name: 'Jira', isActive: true},
            {image: '', name: 'Slack', isActive: true},
        ],
    },
    {
        image: '',
        email: 'diana@01republic.io',
        invoiceApps: [
            {image: '', name: 'Google ads', isActive: true},
            {image: '', name: 'Meta business', isActive: true},
        ],
    },
];

export const InvoiceAccountAddingButton = memo(() => {
    const [invoiceAccounts, setInvoiceAccounts] = useRecoilState(invoiceAccountsAtom);
    const setModalShow = useSetRecoilState(isOpenNewInvoiceAccountModalAtom);
    const currentOrg = useRecoilValue(currentOrgAtom);
    const setSelectedInvoiceAccount = useSetRecoilState(selectedInvoiceAccountAtom);

    useEffect(() => {
        if (!currentOrg) return;
        console.log('currentOrg', currentOrg);
        setInvoiceAccounts(dataList);
    }, [currentOrg]);

    const isEmpty = invoiceAccounts.length === 0;

    return (
        <div
            className="dropdown dropdown-bottom dropdown-end"
            onBlur={(e) => {
                if (!e.relatedTarget) setSelectedInvoiceAccount(null);
            }}
        >
            <button
                className="btn btn-lg btn-scordi-500 shadow gap-2"
                onClick={isEmpty ? () => setModalShow(true) : undefined}
            >
                <span>청구메일 추가</span>
                <span>📩</span>
            </button>

            {!isEmpty && (
                <div
                    className="swap absolute bottom-0"
                    // onClick={(e) => {
                    //     console.log(e);
                    //     e.stopPropagation();
                    //     e.preventDefault();
                    // }}
                >
                    {/*<input type="checkbox" />*/}
                    <InvoiceAccountListPanel />
                    <InvoiceAppListPanel />
                </div>
            )}
        </div>
    );
});
