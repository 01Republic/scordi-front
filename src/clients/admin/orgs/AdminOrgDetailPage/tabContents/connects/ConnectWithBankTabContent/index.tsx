import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {defineTabs, useTabs} from '^components/util/tabs';
import {CodefAccountListContent} from './CodefAccountListContent';
import {CodefBankAccountListContent} from './CodefBankAccountListContent';
import {CodefBillingHistoryListContent} from './CodefBillingHistoryListContent';

const bankConnectedTab = defineTabs('bankConnectedTab', [
    {label: '은행 계정', TabPane: CodefAccountListContent},
    {label: '계좌', TabPane: CodefBankAccountListContent},
    {label: '계좌내역', TabPane: CodefBillingHistoryListContent},
]);

export const ConnectWithBankTabContent = memo(function ConnectWithBankTabContent() {
    const org = useRecoilValue(adminOrgDetail);
    const {tabs, currentTabIndex, setCurrentTabIndex, CurrentTabPane} = useTabs(bankConnectedTab);

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
