import React, {memo, useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {defineTabs, useTabs} from '^components/util/tabs';
import {InvoiceAccountListContent} from './InvoiceAccountListContent';
import {DraftInboxContent} from './DraftInboxContent';
import {selectedInvoiceAccountAtom} from './atoms';

const invoiceAccountConnectedTab = defineTabs('invoiceAccountConnectedTab', [
    {label: '청구서 계정', TabPane: InvoiceAccountListContent},
    {label: '이메일 탐색기', TabPane: DraftInboxContent},
]);

export const InvoiceAccountListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);
    const setSelectedInvoiceAccount = useSetRecoilState(selectedInvoiceAccountAtom);
    const {tabs, currentTabIndex, setCurrentTabIndex, CurrentTabPane} = useTabs(invoiceAccountConnectedTab);

    useEffect(() => {
        return () => {
            setCurrentTabIndex(0);
            setSelectedInvoiceAccount(undefined);
        };
    }, []);

    if (!org) return <></>;

    return (
        <div className="grid grid-cols-6 gap-8">
            <div>
                <ul className="p-0 menu bg-base-100 shadow">
                    {tabs.map((tab, i) => (
                        <li key={i} className={currentTabIndex === i ? 'bordered' : ''}>
                            <a onClick={() => setCurrentTabIndex(i)}>{tab.label}</a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="col-span-5">
                <CurrentTabPane moveTab={(tabIndex: number) => setCurrentTabIndex(tabIndex)} />
            </div>
        </div>
    );
});
